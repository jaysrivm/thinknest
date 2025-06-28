'use client';

import { useRouter } from 'next/navigation';

export default function ParentGradePage({ 
  params 
}: { 
  params: { grade: string } 
}) {
  const router = useRouter();
  const subjects = ['English', 'Math', 'Science'];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-white p-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Grade {params.grade}
        </h1>
        <h2 className="text-2xl text-gray-700 mb-8">
          Select a Subject
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => router.push(`/parent/grade/${params.grade}/${subject.toLowerCase()}/topics`)}
              className="py-4 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg text-lg"
            >
              {subject}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push('/parent')}
          className="mt-8 py-2 px-4 text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          ← Back to Grade Selection
        </button>
      </div>
    </main>
  );
}