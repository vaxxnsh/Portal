"use client";
import Post from "../Post";
import CreateJobListing from "../AddJobs";
import { useScroll } from "framer-motion";
import { useState } from "react";
import {Button} from "@/components/ui/button"
import JobPosts from "../Jobs";

export default function Main() {

    const Arr = new Array(10).fill(0);
    const [isPosts,setIsPosts] = useState(true);
    return (
        <div className="w-full px-16 py-5">
            <div className="flex justify-between">
                <p className="text-[40px]">Hello, User!</p>
                <div className="flex items-center justify-center gap-8">
                    <Button 
                        size={'lg'}
                        onClick={() => setIsPosts(true)}
                    >Show Posts</Button>
                    <Button 
                        size={'lg'}
                        onClick={() => setIsPosts(false)}
                    >Show Jobs</Button>
                </div>
            </div>
            <div className="w-full h-[1px] bg-blue-950"></div>
            <div className="w-full flex gap-10  justify-center after:items-center overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col m-10 gap-10 h-[600px] items-center">
                {
                    isPosts &&   Arr.map((ele,index) => {
                        return (
                            <Post key={index}/>
                        )
                    })
                }
                {
                    !isPosts &&  <JobPosts/>
                }
            </div>
            </div>
        </div>
    )
}