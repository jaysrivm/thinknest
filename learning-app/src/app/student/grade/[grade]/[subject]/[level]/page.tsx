'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { getTopics } from '@/utils/groq';

export default function LevelPage({ 
  params 
}: { 
  params: { grade: string; subject: string; level: string } 
}) {
  const router = useRouter();
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { grade, subject, level } = use(params);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const topicList = await getTopics(grade, subject, level);
        setTopics(topicList);
      } catch (err) {
        setError('Failed to load topics. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [grade, subject, level]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-xl text-gray-600 font-medium">Loading topics...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="text-red-600 bg-red-50 border border-red-100 rounded-lg p-4 shadow-sm">
            <svg className="w-6 h-6 text-red-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-lg font-medium">{error}</div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
            Grade {grade} - {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            {level.charAt(0).toUpperCase() + level.slice(1)} Level
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {topics.map((topic, index) => (
            <div 
              key={index} 
              className="bg-white backdrop-blur-sm bg-opacity-70 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2">{topic}</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push(`/student/grade/${grade}/${subject}/${level}/${encodeURIComponent(topic)}/notes`)}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow font-medium"
                >
                  Study Notes
                </button>
                <button
                  onClick={() => router.push(`/student/grade/${grade}/${subject}/${level}/${encodeURIComponent(topic)}/worksheet`)}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-sm hover:shadow font-medium"
                >
                  Practice
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push(`/student/grade/${grade}/${subject}`)}
            className="inline-flex items-center gap-2 py-2 px-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Level Selection
          </button>
        </div>
      </div>
    </main>
  );
}