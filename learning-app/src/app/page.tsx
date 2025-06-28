'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // If you add an image mascot

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 p-8 relative overflow-hidden font-[Comic_Sans_MS]">
      
      {/* Hero mascot image (example placeholder) */}
      <div className="mb-4 z-10">
        <Image
          src="/mascot.png"
          alt="Learning Buddy Mascot"
          width={150}
          height={150}
          className="animate-bounce"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-200 opacity-50 animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-pink-200 opacity-50 animate-ping delay-700"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-green-200 opacity-50 animate-ping delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-blue-200 opacity-50 animate-ping delay-500"></div>

      <div className="text-center max-w-2xl mx-auto z-10 bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border-4 border-dashed border-yellow-300">
        
        <h1 className="text-5xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600 tracking-tight">
          Let’s Learn & Explore!
        </h1>
        
        <p className="text-lg mb-8 text-gray-700">
          Pick your role to begin your adventure.
        </p>

        <div className="space-y-6">
          <button
            onClick={() => router.push('/student')}
            className="w-72 py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full hover:from-blue-500 hover:to-purple-600 transition-all duration-300 shadow-xl text-xl font-semibold transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <span>I am a Student</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
          
          <button
            onClick={() => router.push('/parent')}
            className="w-72 py-4 px-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-xl text-xl font-semibold transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <span>I am a Parent</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>

        <p className="mt-8 text-purple-700 italic bg-yellow-50 p-3 rounded-xl inline-block shadow border-l-4 border-yellow-400">
          Note: The Parent section supports Grades 1 to 5.
        </p>
      </div>

      <p className="mt-8 text-white text-sm font-semibold z-10">✨ Learning made fun ✨</p>
    </main>
  );
}
