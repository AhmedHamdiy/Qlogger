'use client';
import Link from "next/link";
import Image from "next/image";
export default function Header(){
    return(
        <div className="flex justify-between items-center p-4 bg-black w-full">
        <Image src="/logo.svg"alt="Qlogger"
        width={50} height={50}/>
        <h1 className="text-white">Where Quality Meets Blogging </h1>
        <ul className="flex justify-between items-center gap-4 ">
            <li>
                <Link href="/">
                    <Image src="/home.svg"alt="home"
                    width={30} height={30}/>
                </Link>
                </li>
            <li>
                <Link href="/posts/create">
                    <Image src="/create-post.svg" alt="create-post"
                    width={30} height={30}/>
                </Link>
            </li>
        </ul>
        </div>
    );
} 