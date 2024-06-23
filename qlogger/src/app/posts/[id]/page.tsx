"use client";
import { useEffect, useState } from "react";
import { Blog } from "@/app/utils/defs";
import { useRouter } from 'next/navigation';
import Loading from "./loading";
import { codeSnippetsFormatter } from "@/app/utils/textForamtter";
export default function Post({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [post, setPost] = useState<Blog | null>(null);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            router.push("/");
        }
        const fetchPost = async () => {
            const res = await fetch(`http://localhost:8080/posts/${id}`);
            const data = await res.json();
            setPost(data);
            setLikes(data.likes);
        }
        fetchPost();
    }, []);

    if (!post) {
        return <Loading />;
    }

    const likePost = async () => {
        const newLikes = isLiked ? likes - 1 : likes + 1;
        setIsLiked(!isLiked);
        setLikes(newLikes);

        const res = await fetch(`http://localhost:8080/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            ...post,
            likes: newLikes,
        }),
        });

        if (!res.ok) {
        console.error("Error updating likes:", res.statusText);
        setLikes(likes); 
        setIsLiked(isLiked); 
        }
    };

    return (
        <div className="flex flex-col my-8 md:mx-auto sm:mx-8 justify-center items-center w-96 md:w-full md:px-96 gap-4">
        <h1 className="md:text-4xl sm:text-xl font-bold">{post.title}</h1>
        <h2 className="text-gray-600 text-xl">{post.category}</h2>
        <div className="flex sm:ml-16 flex-row items-start md:items-center mt-2 gap-4">
                    <div className="flex items-center gap-2 md:gap-4">
                        <img
                            src="/date.svg"
                            className='w-8 md:w-10'
                            alt="date"
                        />
                        <h6 className="text-xs md:text-base md:leading-10 leading-8">{post.date}</h6>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <img
                            src="/writer.svg"
                            alt="creator"
                            className="w-8 md:w-10"
                        />
                        <h6 className="text-xs md:text-base md:leading-10 leading-8">{post.writer}</h6>
                    </div>
                </div>
        <img
            src="/post-img.svg"
            alt="thumbnail"
            className="rounded-md shadow-md mt-4 mb-4 object-cover h-96 w-full"
        />
        <p className="p-4 sm:w-full  overflow-x-auto " dangerouslySetInnerHTML={{ __html: codeSnippetsFormatter(post.content) }} />
        <div className="flex flex-row gap-4">
            <div onClick={likePost} className="cursor-pointer">
            <HeartIcon isLiked={isLiked} />
            </div>
            <h6 className="leading-8">{likes}</h6>
        </div>
        </div>
    );
}

const HeartIcon = ({ isLiked }: { isLiked: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 375 375" preserveAspectRatio="xMidYMid meet" version="1.0">
    <defs>
        <clipPath id="d060f4a982">
        <path d="M 7.925781 7.925781 L 367.175781 7.925781 L 367.175781 367.175781 L 7.925781 367.175781 Z M 7.925781 7.925781 " clipRule="nonzero" />
        </clipPath>
    </defs>
    <g clipPath="url(#d060f4a982)">
        <path fill={isLiked ? "#ff0000" : "#000000"} d="M 367.070312 187.5 C 367.070312 286.695312 286.695312 367.070312 187.5 367.070312 C 88.304688 367.070312 7.925781 286.695312 7.925781 187.5 C 7.925781 88.304688 88.304688 7.925781 187.5 7.925781 C 286.695312 7.925781 367.070312 88.304688 367.070312 187.5 Z M 367.070312 187.5 " fillOpacity="1" fillRule="nonzero" />
    </g>
    <path fill="#ffffff" d="M 300.917969 165.519531 C 300.917969 229.519531 209.980469 282.671875 190.945312 293.160156 C 188.792969 294.378906 186.132812 294.378906 183.980469 293.160156 C 164.945312 282.746094 74.007812 229.589844 74.007812 165.519531 C 74.007812 165.089844 74.007812 164.585938 74.007812 164.15625 C 74.007812 163.867188 74.007812 163.507812 74.007812 163.222656 C 74.007812 161.570312 74.082031 159.917969 74.152344 158.265625 C 76.453125 125.871094 100.875 100.371094 130.683594 100.371094 C 162 100.371094 187.425781 128.527344 187.425781 163.222656 C 187.425781 128.527344 212.855469 100.371094 244.171875 100.371094 C 274.269531 100.371094 298.90625 126.300781 300.773438 159.125 C 300.84375 160.492188 300.917969 161.855469 300.917969 163.222656 L 300.917969 163.292969 C 300.917969 164.082031 300.917969 164.800781 300.917969 165.519531 Z M 300.917969 165.519531 " fillOpacity="1" fillRule="nonzero" />
    </svg>
);