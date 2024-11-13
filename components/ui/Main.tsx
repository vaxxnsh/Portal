import { div } from "framer-motion/client";
import Post from "../Post";

export default function Main() {
    const Arr = new Array(10).fill(0);
    return (
        <div className="w-full flex gap-10  justify-center after:items-center  bg-lime-300 overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col m-10 gap-10 h-[600px] items-center">
                {
                    Arr.map((ele,index) => {
                        return (
                            <Post key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}