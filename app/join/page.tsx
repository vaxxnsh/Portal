"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Join = () => {
  const router = useRouter();
  const [roomid, setRoomid] = useState("");
 

  const handleJoin = () => {
    if (roomid.trim()) {
      router.push(`/room/${roomid}`);
    } else {
      alert("Please enter a room ID");
    }
  };

  return (
    <div className="text-black">
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomid}
        onChange={(e) => setRoomid(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default Join;