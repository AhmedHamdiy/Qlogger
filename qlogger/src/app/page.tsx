"use client";
import { useEffect, useState } from "react";
import Post from "@/app/components/post";
import Loading from "./loading";
import { categories, Blog } from "@/app/utils/defs";

export default function Home() {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Blog[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:8080/posts");
            const data = await response.json();
            const sortedPosts = data.sort((postA:Blog, postB:Blog) => parseInt(postB.id) - parseInt(postA.id)); 
            setPosts(sortedPosts);
            setPosts(data);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const filterPosts = () => {
            if (selectedCategory === "") {
                const cachedPosts = posts.slice(0, 8);
                setFilteredPosts(cachedPosts);
            } else {
                const filtered = posts.filter((post) => post.category === selectedCategory);
                const cachedPosts = filtered.slice(0, 8);
                setFilteredPosts(cachedPosts);
            }
        };
        filterPosts();
    }, [selectedCategory, posts]);

    const handleCategoryClick = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory("");
            return;
        }
        setSelectedCategory(category);
    };

    return (
        posts.length ? (
            <div className="bg-gray-light flex flex-col md:flex-row gap-8 md:pl-16 py-8 relative">
                <div className="flex flex-col w-full gap-8 md:w-3/4">
                    {filteredPosts.map((post) => (
                        <Post key={post.id} {...post} />
                    ))}
                </div>
                <ul className="block w-full md:w-1/4 list-none h-fit md:grid md:grid-cols-2 sm:flex gap-4 justify-around items-center sticky top-24 right-0 p-4 border border-gray-300 rounded-md shadow-sm sm:text-sm overflow-auto">
                    {categories.map((category) => (
                        <li
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`p-2 text-center hover:text-blue-500 hover:cursor-pointer border border-gray-300 rounded-md ${selectedCategory === category ? "bg-black text-white" : "text-gray-700"
                                }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <Loading />
        )
    );
}
