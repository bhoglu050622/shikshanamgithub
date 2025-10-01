'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface CommunityPostsEditorProps {
  content: {
    title: string;
    subtitle: string;
    posts: Array<{
      id: string;
      title: string;
      content: string;
      author: string;
      date: string;
      image: string;
      likes: number;
    }>;
  };
  onChange: (content: any) => void;
}

export default function CommunityPostsEditor({ content, onChange }: CommunityPostsEditorProps) {
  // Add comprehensive null checks and default values
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    posts: content?.posts || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addPost = () => {
    const newPost = {
      id: `post-${Date.now()}`,
      title: "New Post Title",
      content: "Post content",
      author: "Author Name",
      date: new Date().toISOString().split('T')[0],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      likes: 0
    };
    onChange({
      ...safeContent,
      posts: [...safeContent.posts, newPost]
    });
  };

  const updatePost = (index: number, field: string, value: string | number) => {
    const updatedPosts = [...safeContent.posts];
    updatedPosts[index] = { ...updatedPosts[index], [field]: value };
    onChange({
      ...safeContent,
      posts: updatedPosts
    });
  };

  const removePost = (index: number) => {
    const updatedPosts = safeContent.posts.filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      posts: updatedPosts
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Posts Section</CardTitle>
          <CardDescription>
            Edit the community posts section that showcases latest discussions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter section subtitle"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Community Posts</CardTitle>
              <CardDescription>Manage community posts and discussions</CardDescription>
            </div>
            <Button onClick={addPost} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.posts.map((post, index) => (
            <div key={post.id} className="p-4 border rounded-lg space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Post #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePost(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={post.title}
                    onChange={(e) => updatePost(index, 'title', e.target.value)}
                    placeholder="Post title"
                  />
                </div>
                <div>
                  <Label>Author</Label>
                  <Input
                    value={post.author}
                    onChange={(e) => updatePost(index, 'author', e.target.value)}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={post.date}
                    onChange={(e) => updatePost(index, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Likes</Label>
                  <Input
                    type="number"
                    value={post.likes}
                    onChange={(e) => updatePost(index, 'likes', parseInt(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    value={post.image}
                    onChange={(e) => updatePost(index, 'image', e.target.value)}
                    placeholder="https://example.com/post-image.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Content</Label>
                  <Textarea
                    value={post.content}
                    onChange={(e) => updatePost(index, 'content', e.target.value)}
                    placeholder="Post content"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
