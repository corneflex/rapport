import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReportTheme, ReportTitle, ReportContent, ThemeType } from '@/components/ReportTheme';

interface PageProps {
  params: {
    id: string;
  };
}

async function getReport(id: string) {
  const report = await prisma.report.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!report) {
    notFound();
  }

  return report;
}

export default async function ReportPage({ params }: PageProps) {
  const report = await getReport(params.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{report.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Dernière modification: {formatDistanceToNow(new Date(report.updatedAt), { addSuffix: true, locale: fr })}
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href={`/reports/${report.id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Modifier
              </Link>
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Retour
              </Link>
            </div>
          </div>

          <ReportTheme theme={report.theme as ThemeType}>
            <ReportTitle theme={report.theme as ThemeType}>{report.title}</ReportTitle>
            <ReportContent theme={report.theme as ThemeType}>
              <div dangerouslySetInnerHTML={{ __html: report.content }} />
            </ReportContent>
          </ReportTheme>
        </div>
      </div>
    </div>
  );
}
