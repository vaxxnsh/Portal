"use client";
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const Post = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="w-[500px] bg-white rounded-lg shadow-xl mb-5">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            {/* <Image 
              src="/api/placeholder/48/48" 
              fill
              alt="Profile" 
              className="w-full h-full object-cover"
            /> */}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Senior Software Engineer</p>
            <p className="text-xs text-gray-500">2h • 🌐</p>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">
          Excited to announce that we&apos;ve just launched our new feature! 🚀 
          It&apos;s been amazing working with such a talented team to bring this vision to life.
          #Innovation #Technology #Programming
        </p>
      </div>

      {/* Post Image */}
      <div className="w-full bg-gray-100">
        {/* <Image 
          src="/api/placeholder/600/400" 
          alt="Post content" 
          className="w-full object-cover"
        /> */}
      </div>

      {/* Engagement Stats */}
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500">{likeCount} likes</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>24 comments</span>
          <span>•</span>
          <span>12 shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 flex justify-between">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
            isLiked ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          <span>Like</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;

