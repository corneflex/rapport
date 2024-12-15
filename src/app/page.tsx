import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getReports } from '@/services/reports';
import { FileText, Clock } from 'lucide-react';

export default async function Home() {
  const reports = await getReports();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mes Rapports</h1>
            <Link
              href="/reports/new"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Nouveau Rapport
            </Link>
          </div>

          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/reports/${report.id}`}
                  className="group"
                >
                  <article className="h-full bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {report.title}
                        </h2>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {formatDistanceToNow(new Date(report.updatedAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border shadow-sm">
              <div className="max-w-md mx-auto">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-card-foreground mb-2">
                  Aucun rapport pour le moment
                </h2>
                <p className="text-muted-foreground mb-4">
                  Commencez par créer votre premier rapport de stage.
                </p>
                <Link
                  href="/reports/new"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Créer mon premier rapport
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
