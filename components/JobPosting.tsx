"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    username: '',
    jobrole: '',
    skillsreq: '',
    joblocation: '',
    description: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter(field => formData[field]);
    
    if (emptyFields.length > 0) {
      setStatus({
        type: 'error',
        message: `Please fill in all required fields: ${emptyFields.join(', ')}`
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    try {
          
      const response = await axios.post('http://localhost:8080/job/create',{
        ...formData
      })

      if (response.data.error) {
        setStatus({
          type: 'error',
          message: 'Please enter a valid email address'
        });
        return;
      }
      setStatus({
        type: 'success',
        message: 'Job posting submitted successfully!'
      });      
      // Clear form
      setFormData({
        email: '',
        fullname: '',
        password: '',
        username: '',
        jobrole: '',
        skillsreq: '',
        joblocation: '',
        description: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error submitting job posting. Please try again.'
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {status.message && (
            <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
              {status.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobrole">Job Role</Label>
              <Input
                id="jobrole"
                name="jobrole"
                value={formData.jobrole}
                onChange={handleChange}
                placeholder="Senior Developer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="joblocation">Job Location</Label>
              <Input
                id="joblocation"
                name="joblocation"
                value={formData.joblocation}
                onChange={handleChange}
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillsreq">Required Skills</Label>
            <Input
              id="skillsreq"
              name="skillsreq"
              value={formData.skillsreq}
              onChange={handleChange}
              placeholder="React, Node.js, TypeScript"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed job description..."
              className="h-32"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Job Posting
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;