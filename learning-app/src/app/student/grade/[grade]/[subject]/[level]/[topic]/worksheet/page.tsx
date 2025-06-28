'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateWorksheet } from '@/utils/groq';

export default function WorksheetPage({ 
  params 
}: { 
  params: { grade: string; subject: string; level: string; topic: string } 
}) {
  const router = useRouter();
  const [worksheet, setWorksheet] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWorksheet() {
      try {
        const content = await generateWorksheet(
          params.grade,
          params.subject,
          params.level,
          decodeURIComponent(params.topic)
        );
        setWorksheet(content);
      } catch (err) {
        setError('Failed to generate worksheet. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchWorksheet();
  }, [params.grade, params.subject, params.level, params.topic]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <div className="text-2xl text-gray-600">Generating your practice questions...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <div className="text-xl text-red-600">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Practice Worksheet: {decodeURIComponent(params.topic)}
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            Grade {params.grade} {params.subject.charAt(0).toUpperCase() + params.subject.slice(1)} - {params.level.charAt(0).toUpperCase() + params.level.slice(1)} Level
          </h2>
          
          <div className="prose max-w-none">
            {worksheet.split('\n').map((line, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => router.push(`/student/grade/${params.grade}/${params.subject}/${params.level}`)}
            className="py-2 px-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            ← Back to Topics
          </button>
          <button
            onClick={() => router.push(`/student/grade/${params.grade}/${params.subject}/${params.level}/${params.topic}/notes`)}
            className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Review Notes
          </button>
        </div>
      </div>
    </main>
  );
}