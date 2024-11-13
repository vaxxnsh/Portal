import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, 
  MapPin, 
  Search, 
  Mail, 
  Calendar,
  BookmarkPlus,
  Share2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobPosts = () => {
  // Sample job posts data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobrole: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      fullname: "Sarah Johnson",
      email: "careers@techcorp.com",
      joblocation: "New York, NY",
      skillsreq: ["React", "TypeScript", "Next.js", "Tailwind"],
      description: "We're looking for a Senior Frontend Developer to join our growing team...",
      postedDate: "2024-11-10",
      salary: "$120k - $150k"
    },
    {
      id: 2,
      jobrole: "Full Stack Engineer",
      company: "InnovateLabs",
      fullname: "Michael Chen",
      email: "jobs@innovatelabs.com",
      joblocation: "San Francisco, CA",
      skillsreq: ["Node.js", "Python", "React", "MongoDB"],
      description: "Seeking a Full Stack Engineer with strong backend experience...",
      postedDate: "2024-11-12",
      salary: "$130k - $160k"
    },
    {
      id: 3,
      jobrole: "Data Scientist",
      company: "DataMinds",
      fullname: "Lisa Park",
      email: "apply@dataminds.com",
      joblocation: "Boston, MA",
      skillsreq: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      description: "Join our analytics team as a Data Scientist to work on cutting-edge projects...",
      postedDate: "2024-11-09",
      salary: "$110k - $140k"
    },
    {
      id: 4,
      jobrole: "Backend Developer",
      company: "CloudSolutions",
      fullname: "David Lin",
      email: "jobs@cloudsolutions.com",
      joblocation: "Seattle, WA",
      skillsreq: ["Java", "Spring Boot", "Microservices", "Docker"],
      description: "Looking for an experienced Backend Developer to build scalable services...",
      postedDate: "2024-11-08",
      salary: "$115k - $135k"
    },
    {
      id: 5,
      jobrole: "Product Manager",
      company: "TechVantage",
      fullname: "Emma Green",
      email: "careers@techvantage.com",
      joblocation: "Austin, TX",
      skillsreq: ["Agile", "Project Management", "UX/UI", "Data Analysis"],
      description: "Seeking a Product Manager to lead cross-functional teams...",
      postedDate: "2024-11-06",
      salary: "$110k - $130k"
    },
    {
      id: 6,
      jobrole: "UX/UI Designer",
      company: "CreativeWorks",
      fullname: "Alex Morgan",
      email: "design@creativeworks.com",
      joblocation: "Remote",
      skillsreq: ["Figma", "Sketch", "User Research", "Prototyping"],
      description: "We're looking for a UX/UI Designer to craft exceptional digital experiences...",
      postedDate: "2024-11-05",
      salary: "$90k - $120k"
    },
    {
      id: 7,
      jobrole: "DevOps Engineer",
      company: "BuildIt",
      fullname: "James Reed",
      email: "careers@buildit.com",
      joblocation: "Denver, CO",
      skillsreq: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
      description: "BuildIt is looking for a skilled DevOps Engineer to optimize our infrastructure...",
      postedDate: "2024-11-04",
      salary: "$120k - $145k"
    },
    {
      id: 8,
      jobrole: "Mobile App Developer",
      company: "AppVentures",
      fullname: "Sophia Martinez",
      email: "jobs@appventures.com",
      joblocation: "Los Angeles, CA",
      skillsreq: ["React Native", "iOS", "Android", "APIs"],
      description: "Seeking a Mobile App Developer to work on exciting new app projects...",
      postedDate: "2024-11-03",
      salary: "$105k - $130k"
    },
    {
      id: 9,
      jobrole: "Cybersecurity Analyst",
      company: "SecureNet",
      fullname: "Brian Taylor",
      email: "apply@securenet.com",
      joblocation: "Chicago, IL",
      skillsreq: ["Network Security", "Firewalls", "Threat Analysis", "SIEM"],
      description: "Join SecureNet as a Cybersecurity Analyst to protect our systems...",
      postedDate: "2024-11-02",
      salary: "$100k - $125k"
    },
    {
      id: 10,
      jobrole: "Machine Learning Engineer",
      company: "AI Innovations",
      fullname: "Olivia White",
      email: "careers@aiinnovations.com",
      joblocation: "Remote",
      skillsreq: ["Python", "TensorFlow", "Pytorch", "NLP"],
      description: "We are hiring a Machine Learning Engineer to develop and deploy models...",
      postedDate: "2024-11-01",
      salary: "$130k - $160k"
    }
]);


  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  // Filter jobs based on search term and location
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobrole.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || 
                           job.joblocation.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Available Positions</h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select 
            value={locationFilter} 
            onValueChange={setLocationFilter}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <Card key={job.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">{job.jobrole}</CardTitle>
                  <p className="text-gray-600 mt-1">{job.company}</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                  New
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{job.joblocation}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skillsreq.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-600 mt-4 line-clamp-3">
                  {job.description}
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-semibold">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
};

export default JobPosts;