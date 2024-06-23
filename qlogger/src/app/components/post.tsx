'use client';
import { useRouter } from 'next/navigation';
import { Blog } from "@/app/utils/defs";
import { HTMLConverter } from '@/app/utils/textForamtter';

export default function Post(post: Blog) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`posts/${post.id}`)} className='bg-white w-full px-4 py-2 mb-8 flex flex-col md:flex-row relative md:h-60 sm:h-96 cursor-pointer'>
            <img
                src="./post-img.svg"
                alt={post.title}
                className="rounded-md shadow-md object-cover sm:h-2/5 sm:w-full md:w-1/3 md:h-auto mb-4 md:mb-0 md:mr-4"
            />
            <div className="relative md:pl-4 flex-1">
                <h1 className="text-base md:text-4xl font-bold mb-2">{post.title}</h1>
                <h2 className='text-gray-500 text-sm md:text-xl mb-4'>{post.category}</h2>
                <p className='text-sm md:text-base mb-4'>{HTMLConverter(post.content)}</p>
                <div className="flex sm:ml-16 flex-row items-start absolute bottom-2 md:items-center mt-2 gap-4">
                    <div className="flex items-center gap-2 md:gap-4">
                        <img
                            src="./date.svg"
                            className='w-4 md:w-6'
                            alt="date"
                        />
                        <h6 className="text-xs md:text-base">{post.date}</h6>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <img
                            src="./writer.svg"
                            alt="creator"
                            className="w-4 md:w-6"
                        />
                        <h6 className="text-xs md:text-base">{post.writer}</h6>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <img
                            src="./like.svg"
                            className='w-4 md:w-6'
                            alt="likes"
                        />
                        <h6 className="text-xs md:text-base">{post.likes}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}
