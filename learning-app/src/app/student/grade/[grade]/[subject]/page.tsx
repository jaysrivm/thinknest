'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function SubjectPage({ 
  params 
}: { 
  params: { grade: string; subject: string } 
}) {
  const router = useRouter();
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const { grade, subject } = use(params);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Grade {grade} - {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </h1>
        <h2 className="text-2xl text-gray-700 mb-8">
          Choose Your Learning Level
        </h2>
        
        <div className="space-y-4">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => router.push(`/student/grade/${grade}/${subject}/${level.toLowerCase()}`)}              
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg text-lg"
            >
              {level}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push(`/student/grade/${grade}`)}
          className="mt-8 py-2 px-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Subject Selection
        </button>
      </div>
    </main>
  );
}