import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/json-store";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: "Only images are allowed" }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${session.id}-${Date.now()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bytes));

    // Update user data with avatar URL
    const users = await readJson("users", []);
    const userIndex = users.findIndex((user: any) => user.id === session.id);
    
    if (userIndex !== -1) {
      users[userIndex].avatar = `/uploads/avatars/${fileName}`;
      await writeJson("users", users);
    }

    return NextResponse.json({ 
      success: true, 
      avatarUrl: `/uploads/avatars/${fileName}` 
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update user data to remove avatar
    const users = await readJson("users", []);
    const userIndex = users.findIndex((user: any) => user.id === session.id);
    
    if (userIndex !== -1) {
      // Delete old avatar file if it exists
      if (users[userIndex].avatar) {
        const oldAvatarPath = path.join(process.cwd(), 'public', users[userIndex].avatar);
        try {
          await fs.unlink(oldAvatarPath);
        } catch (error) {
          console.error("Error deleting old avatar file:", error);
        }
      }
      
      users[userIndex].avatar = null;
      await writeJson("users", users);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Avatar removed successfully" 
    });
  } catch (error) {
    console.error("Error removing avatar:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
