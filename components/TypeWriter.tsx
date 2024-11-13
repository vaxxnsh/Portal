"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";
 
export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Get",
      className: "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600",
    },
    {
      text: "awesome",
      className: "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600",
    },
    {
      text: "Job",
      className: "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600",
    },
    {
      text: "Using",
      className: "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600",
    },
    {
      text: "Worktopia.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[20rem] ">
      <p className="text-neutral-200 text-4xl  mb-10">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <p className="text-neutral-200 text-2xl  mb-10">
           Ensure your career safety, By Choosing Us.
        </p>
      </div>
    </div>
  );
}