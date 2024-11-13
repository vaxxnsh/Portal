"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Building2, MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';
import { form } from 'framer-motion/client';

const CreateJobListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    employmentType: 'full-time',
    workplaceType: 'on-site',
    experienceLevel: 'mid-level',
    salaryRange: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Replace with your API endpoint
      const response = await axios.post('http://localhost:8080/job/create', {
       jobrole : formData.title,
       skillsreq : formData.requirements,
       joblocation : formData.location,
       description : formData.description,

      });

      if (response.data.error) {
        throw new Error('Failed to create job listing');
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({
        title: '',
        company: '',
        location: '',
        employmentType: 'full-time',
        workplaceType: 'on-site',
        experienceLevel: 'mid-level',
        salaryRange: '',
        description: '',
        requirements: '',
        benefits: ''
      });
    } catch (err : any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[600px] mx-auto p-4">
      {showSuccess && (
        <Alert className="mb-4 bg-green-50 text-green-700">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Job listing created successfully!</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Job Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Senior Software Engineer"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Tech Corp Inc."
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. New York, NY"
                    required
                  />
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Salary Range</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. $80,000 - $120,000"
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Workplace Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Workplace Type</label>
                <select
                  name="workplaceType"
                  value={formData.workplaceType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="on-site">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="entry-level">Entry Level</option>
                  <option value="mid-level">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role and responsibilities..."
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium mb-2">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500"
                  placeholder="List the required skills and qualifications..."
                  required
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium mb-2">Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500"
                  placeholder="List the benefits and perks..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({
                  title: '',
                  company: '',
                  location: '',
                  employmentType: 'full-time',
                  workplaceType: 'on-site',
                  experienceLevel: 'mid-level',
                  salaryRange: '',
                  description: '',
                  requirements: '',
                  benefits: ''
                })}
                className="px-6"
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? 'Creating...' : 'Create Job Listing'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJobListing;