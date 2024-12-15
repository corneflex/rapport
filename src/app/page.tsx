import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import prisma from '@/lib/prisma';

async function getReports() {
  const reports = await prisma.report.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return reports;
}

export default async function Home() {
  const reports = await getReports();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Rapports de Stage</h1>
            <Link
              href="/reports/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouveau Rapport
            </Link>
          </div>

          <div className="grid gap-4">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/reports/${report.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {report.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Dernière modification: {formatDistanceToNow(new Date(report.updatedAt), { addSuffix: true, locale: fr })}
                </p>
              </Link>
            ))}

            {reports.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Aucun rapport pour le moment</p>
                <Link
                  href="/reports/new"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Créer votre premier rapport
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
