import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/json-store";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json({ error: "Post type is required" }, { status: 400 });
    }

    // Map type to filename
    const typeToFile: Record<string, string> = {
      'blog': 'blogs.json',
      'article': 'articles.json',
      'video': 'videos.json',
      'book': 'books.json',
      'podcast': 'podcast.json',
      'gallery': 'gallery.json',
      'art': 'art.json',
      'education': 'education.json',
      'store': 'store.json'
    };

    const filename = typeToFile[type];
    if (!filename) {
      return NextResponse.json({ error: "Invalid post type" }, { status: 400 });
    }

    // Read the current data
    const posts = await readJson(filename, []);
    
    // Find the post
    const postIndex = posts.findIndex((post: any) => post.id === id);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = posts[postIndex];
    
    // Check if user owns this post
    const isOwner = post.author === session.username || 
                   post.author === session.name || 
                   post.authorId === session.id;
    
    if (!isOwner) {
      return NextResponse.json({ error: "You can only delete your own posts" }, { status: 403 });
    }

    // Remove the post
    posts.splice(postIndex, 1);
    
    // Write back to file
    await writeJson(filename, posts);

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
