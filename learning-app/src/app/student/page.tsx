'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function StudentPage() {
  const router = useRouter();
  const grades = Array.from({ length: 7 }, (_, i) => i + 6);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 p-8 relative overflow-hidden font-[Comic_Sans_MS]">
      
      {/* Mascot or Hero Image */}
      <div className="mb-6 z-10">
        <Image
          src="/grade-mascot.png"
          alt="Grade selection buddy"
          width={120}
          height={120}
          className="animate-bounce"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-200 opacity-40 animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pink-200 opacity-40 animate-ping delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-green-200 opacity-40 animate-ping delay-700"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full bg-blue-200 opacity-40 animate-ping delay-1000"></div>
      </div>

      <div className="text-center max-w-3xl mx-auto z-10 bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl border-4 border-dashed border-yellow-200">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Select Your Grade
        </h1>
        <p className="text-lg mb-8 text-gray-700 italic">Your learning journey starts here!</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => router.push(`/student/grade/${grade}`)}
              className="group relative overflow-hidden py-6 px-6 bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-2xl hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-xl text-xl font-semibold transform hover:scale-105 hover:shadow-2xl border-2 border-white"
            >
              <span className="text-3xl">🎓</span>
              <span className="block mt-2">Grade {grade}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-4 py-3 px-6 bg-white text-indigo-600 rounded-full border-2 border-indigo-200 hover:bg-indigo-50 transition-all duration-300 font-semibold inline-flex items-center space-x-2 shadow-sm hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>

      <p className="mt-8 text-white text-sm font-semibold z-10">📚 Keep learning, keep growing!</p>
    </main>
  );
}
