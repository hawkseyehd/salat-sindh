"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, User } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentAvatar?: string;
  username: string;
  onAvatarChange: (avatarUrl: string | null) => void;
}

export function AvatarUpload({ currentAvatar, username, onAvatarChange }: AvatarUploadProps) {
  const [avatar, setAvatar] = useState<string | null>(currentAvatar || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('صرف تصاویر اپ لوڈ کی جا سکتی ہیں');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('تصویر کا سائز 5MB سے کم ہونا چاہیے');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatar(data.avatarUrl);
        onAvatarChange(data.avatarUrl);
        toast.success('تصویر کامیابی سے اپ لوڈ ہو گئی');
      } else {
        const error = await response.json();
        toast.error(error.error || 'تصویر اپ لوڈ کرنے میں خرابی');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('تصویر اپ لوڈ کرنے میں خرابی');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const response = await fetch('/api/profile/avatar', {
        method: 'DELETE',
      });

      if (response.ok) {
        setAvatar(null);
        onAvatarChange(null);
        toast.success('تصویر حذف کر دی گئی');
      } else {
        const error = await response.json();
        toast.error(error.error || 'تصویر حذف کرنے میں خرابی');
      }
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast.error('تصویر حذف کرنے میں خرابی');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatar || undefined} alt={username} />
        <AvatarFallback className="bg-red-500 text-white text-lg font-semibold">
          {avatar ? <User className="h-8 w-8" /> : getInitials(username)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="border-blue-700/30 text-blue-200 hover:bg-blue-800/20"
          >
            <Upload className="h-4 w-4 ml-2" />
            {uploading ? 'اپ لوڈ ہو رہا...' : 'تصویر منتخب کریں'}
          </Button>
          
          {avatar && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemoveAvatar}
              className="bg-red-600 hover:bg-red-700"
            >
              <X className="h-4 w-4 ml-2" />
              حذف
            </Button>
          )}
        </div>
        
        <p className="text-xs text-blue-400">
          JPG, PNG یا GIF (زیادہ سے زیادہ 5MB)
        </p>
      </div>
    </div>
  );
}
