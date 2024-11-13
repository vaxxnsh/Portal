"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Nav";

const Join = () => {
  const router = useRouter();
  const [roomid, setRoomid] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const handleJoin = () => {
    if (roomid.trim()) {
      router.push(`/room/${roomid}`);
    } else {
      alert("Please enter a room ID");
    }
  };

  return (
    <div className="text-black w-full h-full">
      <Header/>
      <div className="w-full h-svh flex items-center justify-center">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomid}
            className="mb-5 w-[200px] h-[50px]"
            onChange={(e) => setRoomid(e.target.value)}
          />
          <button onClick={handleJoin} className="bg-[#020617] text-white text-xl py-1 px-3 mx-6 rounded">Join</button>
        </div>
      </div>
    </div>
  );
};

export default Join;