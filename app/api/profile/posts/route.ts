import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson } from "@/lib/json-store";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read all content types
    const [blogs, articles, videos, books, podcasts, gallery, art, education, store] = await Promise.all([
      readJson("blogs", []),
      readJson("articles", []),
      readJson("videos", []),
      readJson("books", []),
      readJson("podcast", []),
      readJson("gallery", []),
      readJson("art", []),
      readJson("education", []),
      readJson("store", [])
    ]);

    // Filter posts by author (using username or name)
    const userPosts = [];
    
    // Helper function to add posts with type
    const addPostsWithType = (posts: any[], type: string) => {
      posts.forEach(post => {
        if (post.author === session.username || post.author === session.name || post.authorId === session.id) {
          userPosts.push({
            ...post,
            type,
            createdAt: post.createdAt || new Date().toISOString(),
            updatedAt: post.updatedAt
          });
        }
      });
    };

    addPostsWithType(blogs, 'blog');
    addPostsWithType(articles, 'article');
    addPostsWithType(videos, 'video');
    addPostsWithType(books, 'book');
    addPostsWithType(podcasts, 'podcast');
    addPostsWithType(gallery, 'gallery');
    addPostsWithType(art, 'art');
    addPostsWithType(education, 'education');
    addPostsWithType(store, 'store');

    // Sort by creation date (newest first)
    userPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ posts: userPosts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
