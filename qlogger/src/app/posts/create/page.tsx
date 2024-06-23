"use client";
import { useState,useEffect } from 'react';
import ReactQuill,{ Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MarkdownShortcuts from 'quill-markdown-shortcuts';
Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
import { Blog,categories } from "@/app/utils/defs";
import { useRouter } from 'next/navigation';

const modules = {
    markdownShortcuts: {},
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean'],
        ['code-block']
    ],
};
const formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align', 'direction',
    'list', 'bullet', 'indent',
    'color', 'background',
    'link', 'image', 'video',
    'code-block',
];

export default function CreatePost () {
    const router=useRouter();
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [created,setCreated]=useState(false);
    const addPost = async (blog:Blog) => {
        const res = await fetch("http://localhost:8080/posts", {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        const data = await res.json();
        console.log(data);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !content|| !writer || !category) 
            alert('All fields are required.');
        else{
            const response = await fetch('http://localhost:8080/posts');
            const blogs = await response.json();            
            const id = String(blogs.length + 1);
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();          
            const date = `${year}-${month}-${day}`;
            const newPost:Blog = {
                id,
                title,
                writer,
                content,
                category,
                date,
                likes: 0,
            };
            setCreated(true);
            console.log(newPost);
            addPost(newPost);
            setTimeout(() => {
                setTitle('');
                setWriter('');
                setContent('');
                setCategory('');
                setCreated(false);
                router.push('/');
            }, 1000);
        }
    };

    
    return (
        <div>
            <form onSubmit={handleSubmit} className='md:px-72 sm:px-0 flex flex-col gap-8 pt-8 justify-around items-center border border-gray-300 rounded-md  shadow-sm md:mx-96 my-8 '>
            <h1 className="text-center text-3xl mt-4 px-2 font-bold " >Time to unleash your inner stories!</h1>
                <div className='flex flex-col md:w-96 sm:w-48'>
                    <label className='text-center' htmlFor="title">Title</label>
                    <input className='my-2 p-2 h-12 border border-gray-300 rounded-md' type="text" id="title" value={title} required autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col md:w-96 sm:w-48'>
                    <label className='text-center' htmlFor="creator">Writer</label>
                    <input className='my-2 p-2 h-12 border border-gray-300 rounded-md' type="text" id="creator" value={writer} required autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriter(e.target.value)} />
                </div>
                <div className='flex flex-col md:w-96 sm:w-48'>
                    <label className='text-center' htmlFor="category">Category</label>
                    <select className='my-2 h-12 p-2 border border-gray-300 rounded-md' id="category" value={category} required onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col md:w-full sm:mb-2 sm:w-96 sm:ml-4'>
                    <label className='text-center' htmlFor="content">Content</label>
                    <ReactQuill className='h-96 w-full ' theme="snow" value={content} modules={modules} formats={formats} onChange={setContent}/>
                </div>
                <button className='m-8 bg-black border border-black-300 rounded-md p-2 text-white hover:text-black hover:bg-white' type="submit">Create Post</button>
            </form>
            {created && <p className='text-center text-xl pb-4 text-blue'>Your post has been created!</p>}
        </div>
    );
};