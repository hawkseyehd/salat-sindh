"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Image, Video, BookOpen, Mic, ShoppingBag, Palette, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SessionUser } from "@/lib/auth";
import { AvatarUpload } from "@/components/ui/avatar-upload";

interface UserPost {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  author?: string;
  status?: string;
  createdAt: string;
  updatedAt?: string;
  type: 'blog' | 'article' | 'video' | 'book' | 'podcast' | 'gallery' | 'art' | 'education' | 'store';
}

interface ProfileClientProps {
  user: SessionUser;
}

export function ProfileClient({ user }: ProfileClientProps) {
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState<string | null>(user.avatar || null);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/profile/posts');
      if (response.ok) {
        const data = await response.json();
        setUserPosts(data.posts || []);
      } else {
        console.error("Failed to fetch user posts");
        setUserPosts([]);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setUserPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      case 'podcast': return <Mic className="h-4 w-4" />;
      case 'gallery': return <Image className="h-4 w-4" />;
      case 'art': return <Palette className="h-4 w-4" />;
      case 'education': return <GraduationCap className="h-4 w-4" />;
      case 'store': return <ShoppingBag className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPostTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'blog': 'بلاگ',
      'article': 'مضمون',
      'video': 'ویڈیو',
      'book': 'کتاب',
      'podcast': 'پوڈ کاسٹ',
      'gallery': 'گیلری',
      'art': 'آرٹ',
      'education': 'تعلیم',
      'store': 'اسٹور'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-600">منتشر</Badge>;
      case 'draft':
        return <Badge variant="secondary">ڈرافٹ</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">منتظر</Badge>;
      default:
        return <Badge variant="outline">نامعلوم</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-blue-200" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-blue-300 hover:text-red-400 transition-colors duration-300"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>واپس</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">پروفائل</h1>
            <p className="text-blue-300">اپنے اکاؤنٹ اور پوسٹس کا نظم کریں</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-blue-700/30">
              <TabsTrigger value="profile" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <User className="h-4 w-4 ml-2" />
                پروفائل
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <FileText className="h-4 w-4 ml-2" />
                میری پوسٹس
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-gray-800 border border-blue-700/30">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    اکاؤنٹ کی تفصیلات
                  </CardTitle>
                  <CardDescription className="text-blue-300">
                    آپ کی بنیادی معلومات
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-start gap-4">
                    <label className="text-sm font-medium text-blue-300">پروفائل تصویر</label>
                    <AvatarUpload
                      currentAvatar={userAvatar}
                      username={user.username}
                      onAvatarChange={setUserAvatar}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-blue-300">نام</label>
                      <p className="text-blue-200 mt-1">{user.name || 'نام درج نہیں'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-300">یوزرنیم</label>
                      <p className="text-blue-200 mt-1">{user.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-300">ای میل</label>
                      <p className="text-blue-200 mt-1">{user.email || 'ای میل درج نہیں'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-6">
              <Card className="bg-gray-800 border border-blue-700/30">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    میری پوسٹس
                  </CardTitle>
                  <CardDescription className="text-blue-300">
                    آپ کی تمام پوسٹس اور اپ لوڈز
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400 mx-auto"></div>
                      <p className="text-blue-300 mt-2">لوڈ ہو رہا ہے...</p>
                    </div>
                  ) : userPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-300 mb-4">ابھی تک کوئی پوسٹ نہیں ہے</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Link href="/blogs/create">
                          <Button variant="outline" className="border-blue-700/30 text-blue-200 hover:bg-blue-800/20">
                            <FileText className="h-4 w-4 ml-2" />
                            نیا بلاگ
                          </Button>
                        </Link>
                        <Link href="/articles/create">
                          <Button variant="outline" className="border-blue-700/30 text-blue-200 hover:bg-blue-800/20">
                            <FileText className="h-4 w-4 ml-2" />
                            نیا مضمون
                          </Button>
                        </Link>
                        <Link href="/videos/create">
                          <Button variant="outline" className="border-blue-700/30 text-blue-200 hover:bg-blue-800/20">
                            <Video className="h-4 w-4 ml-2" />
                            نیا ویڈیو
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userPosts.map((post) => (
                        <div 
                          key={post.id}
                          className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-blue-700/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {getPostTypeIcon(post.type)}
                              <div>
                                <h3 className="text-blue-200 font-medium">{post.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {getPostTypeLabel(post.type)}
                                  </Badge>
                                  {getStatusBadge(post.status)}
                                  <span className="text-xs text-blue-400">
                                    {new Date(post.createdAt).toLocaleDateString('ur-PK')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/${post.type}s/edit/${post.id}`}>
                              <Button size="sm" variant="outline" className="border-blue-700/30 text-blue-200 hover:bg-blue-800/20">
                                ترمیم
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={async () => {
                                if (confirm('کیا آپ واقعی اس پوسٹ کو حذف کرنا چاہتے ہیں؟')) {
                                  try {
                                    const response = await fetch(`/api/profile/posts/${post.id}?type=${post.type}`, {
                                      method: 'DELETE'
                                    });
                                    
                                    if (response.ok) {
                                      // Remove from local state
                                      setUserPosts(prev => prev.filter(p => p.id !== post.id));
                                    } else {
                                      const error = await response.json();
                                      alert('پوسٹ حذف کرنے میں خرابی: ' + error.error);
                                    }
                                  } catch (error) {
                                    console.error('Error deleting post:', error);
                                    alert('پوسٹ حذف کرنے میں خرابی');
                                  }
                                }
                              }}
                            >
                              حذف
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
