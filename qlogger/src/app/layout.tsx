import React from 'react'
import Footer from './components/footer';
import Header from './components/header';
import "./global.css";

export const metadata = {
  title: 'Qlogger',
  description: 'Where Quality Meets Blogging'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.svg" /></head>
      <body className='bg-gray-light relative w-full p-0'>
        <Header />
        {children}
        <Footer/>
        </body>
    </html>
  )
}
