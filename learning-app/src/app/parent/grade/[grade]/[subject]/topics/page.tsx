'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTopics, generateNotes, generateWorksheet } from '@/utils/groq';

export default function ParentTopicsPage({ 
  params 
}: { 
  params: { grade: string; subject: string } 
}) {
  const router = useRouter();
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<'notes' | 'worksheet' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopics() {
      try {
        // For parents, we'll use 'Beginner' level by default
        const topicList = await getTopics(params.grade, params.subject, 'Beginner');
        setTopics(topicList);
      } catch (err) {
        setError('Failed to load topics. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [params.grade, params.subject]);

  async function handleContentGeneration(topic: string, type: 'notes' | 'worksheet') {
    setSelectedTopic(topic);
    setContentType(type);
    setLoading(true);
    setError('');

    try {
      const content = type === 'notes'
        ? await generateNotes(params.grade, params.subject, 'Beginner', topic)
        : await generateWorksheet(params.grade, params.subject, 'Beginner', topic);
      setContent(content);
    } catch (err) {
      setError(`Failed to generate ${type}. Please try again.`);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !selectedTopic) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white">
        <div className="text-2xl text-gray-600">Loading topics...</div>
      </main>
    );
  }

  if (error && !selectedTopic) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white">
        <div className="text-xl text-red-600">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Grade {params.grade} - {params.subject.charAt(0).toUpperCase() + params.subject.slice(1)}
        </h1>

        {!selectedTopic ? (
          <div className="grid gap-6 mt-8">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{topic}</h3>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleContentGeneration(topic, 'notes')}
                    className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    View Notes
                  </button>
                  <button
                    onClick={() => handleContentGeneration(topic, 'worksheet')}
                    className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Worksheet
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedTopic} - {contentType === 'notes' ? 'Study Notes' : 'Practice Worksheet'}
              </h2>
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setContentType(null);
                  setContent('');
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                × Close
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-xl text-gray-600">Generating content...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-xl text-red-600">{error}</div>
              </div>
            ) : (
              <div className="prose max-w-none">
                {content.split('\n').map((line, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push(`/parent/grade/${params.grade}`)}
            className="py-2 px-4 text-green-600 hover:text-green-800 transition-colors duration-200"
          >
            ← Back to Subject Selection
          </button>
        </div>
      </div>
    </main>
  );
}