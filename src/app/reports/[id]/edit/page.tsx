'use client';

import { useEffect, useState } from 'react';
import Editor from '@/components/Editor';
import { useRouter } from 'next/navigation';
import { ThemeType } from '@/components/ReportTheme';

interface PageProps {
  params: Promise<{ id: string }>;
}

const themes = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classique' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'cyberpunk', name: 'Cyberpunk' },
] as const;

export default function EditReport({ params }: PageProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState<ThemeType>('modern');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);

  useEffect(() => {
    const initReport = async () => {
      try {
        const resolvedParams = await params;
        setReportId(resolvedParams.id);
        const response = await fetch(`/api/reports/${resolvedParams.id}`);
        if (!response.ok) throw new Error('Failed to fetch report');
        const report = await response.json();
        setTitle(report.title);
        setContent(report.content);
        setTheme(report.theme as ThemeType);
      } catch (error) {
        console.error('Error fetching report:', error);
        alert('Failed to load report');
      } finally {
        setIsLoading(false);
      }
    };

    initReport();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, theme }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report');
      }

      router.push(`/reports/${reportId}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating report:', error);
      alert('Failed to update report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Modifier le Rapport</h1>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Thème
              </label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeType)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contenu
              </label>
              <Editor content={content} onChange={setContent} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
