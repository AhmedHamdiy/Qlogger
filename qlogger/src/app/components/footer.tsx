'use client';
import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaTiktok} from 'react-icons/fa';
export default function Footer () {
    return (
        <div className="flex static bottom-0 justify-center items-center p-4 bg-black w-full">
            <img src="/logo.svg" alt="logo" className='absolute bottom-0 left-10 md:w-20 sm:w-16'/>
            <div className='flex flex-col  justify-center items-center gap-4'>
                <h2 className='text-white'>Follow Us</h2>
                <ul className='flex gap-4'>
                    <li >
                    <a href="https://twitter.com/Slash_eg" target="_blank" rel="noopener noreferrer">
                        <FaTwitter  className="text-white hover:scale-110 hover:text-blue text-xl"/>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.facebook.com/slashegy/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook  className="text-white hover:scale-110 hover:text-blue text-xl"/>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.instagram.com/slash_eg/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram  className="text-white hover:scale-110 hover:text-blue text-xl"/>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.linkedin.com/company/slash-eg/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin  className="text-white hover:scale-110 hover:text-blue text-xl"/>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.tiktok.com/@slash_eg" target="_blank" rel="noopener noreferrer">
                        <FaTiktok  className="text-white hover:scale-110 hover:text-blue text-xl"/>
                    </a>
                    </li>
                </ul>
            </div>

            <img src="/slash-logo.svg" alt="slash logo" className='absolute bottom-0 right-10 md:w-20 sm:w-16'/>
        </div>
    );
};

