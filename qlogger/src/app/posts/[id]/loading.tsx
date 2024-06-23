import Image from 'next/image';
export default function Loading (){
    return (
        <div className='flex flex-col justify-center items-center m-8 gap-8'>
            <h1>Loading...</h1>
            <p>Please wait while the post data is being loaded.</p>
            <Image 
            src="/loader.gif" alt="loading"
            width={620}
            height={620}
            unoptimized={true}
            />
        </div>
    );
};