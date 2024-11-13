import React, { useState } from 'react';
import { AlertCircle, Image, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AddPost = () => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Replace with your API endpoint
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          // Add any additional fields like userId, timestamp, etc.
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Clear form and show success message
      setContent('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err : any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {showAlert && (
        <Alert className="mb-4 bg-green-50 text-green-700">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Post created successfully!</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Create a post</span>
        </CardHeader>

        <CardContent>
          <textarea
            className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What do you want to talk about?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex justify-between items-center p-4 border-t">
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <Image className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className={`px-4 py-2 ${
              content.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300'
            } text-white rounded-full flex items-center gap-2`}
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddPost;
