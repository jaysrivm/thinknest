'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';
import Image from 'next/image';

export default function GradePage({ params }: { params: { grade: string } }) {
  const router = useRouter();
  const subjects = [
    { name: 'English', icon: '📖' },
    { name: 'Math', icon: '➗' },
    { name: 'Science', icon: '🔬' },
  ];
  const { grade } = use(params);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-8 relative overflow-hidden font-[Comic_Sans_MS]">

      {/* Decorative mascot */}
      <div className="flex justify-center mb-4 z-10">
        <Image
          src="/subject-mascot.png"
          alt="Subject Selection Buddy"
          width={120}
          height={120}
          className="animate-bounce"
        />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-200 opacity-30 animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-pink-200 opacity-30 animate-ping delay-500"></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-green-200 opacity-30 animate-ping delay-700"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
            Grade {grade}
          </h1>
          <p className="text-lg text-gray-700 font-medium italic">
            Choose your next quest!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              onClick={() => router.push(`/student/grade/${grade}/${subject.name.toLowerCase()}`)}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl border-4 border-dashed border-yellow-200 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col items-center"
            >
              <span className="text-4xl mb-2">{subject.icon}</span>
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">{subject.name}</h3>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push('/student')}
            className="inline-flex items-center gap-2 py-3 px-6 bg-white text-indigo-600 rounded-full border-2 border-indigo-200 hover:bg-indigo-50 transition-all duration-200 font-semibold shadow hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Grade Selection
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-indigo-600 text-sm font-semibold z-10">
        ✨ Keep going — learning is fun!
      </p>
    </main>
  );
}
