'use client';

import { useRouter } from 'next/navigation';

export default function ParentPage() {
  const router = useRouter();
  const grades = Array.from({ length: 5 }, (_, i) => i + 1); // Creates array [1,2,3,4,5]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-teal-500 to-emerald-600 p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-yellow-300 opacity-50 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-orange-300 opacity-50 animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-teal-300 opacity-50 animate-pulse delay-700"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-emerald-300 opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="text-center max-w-3xl mx-auto z-10 bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 tracking-tight">
          Select Your Child's Grade
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => router.push(`/parent/grade/${grade}`)}
              className="group relative overflow-hidden py-4 px-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg text-xl font-medium transform hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10">Grade {grade}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-4 py-3 px-6 bg-white text-teal-600 rounded-xl border-2 border-teal-200 hover:bg-teal-50 transition-all duration-300 font-medium inline-flex items-center space-x-2 shadow-sm hover:shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>
    </main>
  );
}