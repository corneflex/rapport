import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import { ReportTheme, ReportTitle, ReportContent, ThemeType } from '@/components/ReportTheme';
import { getReport } from '@/services/reports';
import { FileText, Clock, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  try {
    const report = await getReport(parseInt(resolvedParams.id));
    
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">{report.title}</h1>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      Dernière modification: {formatDistanceToNow(new Date(report.updatedAt), { addSuffix: true, locale: fr })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/reports/${report.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Link>
                  <DeleteButton reportId={report.id} />
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
              <ReportTheme theme={report.theme as ThemeType}>
                <div className="p-6">
                  <ReportTitle theme={report.theme as ThemeType}>{report.title}</ReportTitle>
                  <ReportContent theme={report.theme as ThemeType}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: report.content }} 
                      className="prose prose-gray dark:prose-invert max-w-none"
                    />
                  </ReportContent>
                </div>
              </ReportTheme>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
