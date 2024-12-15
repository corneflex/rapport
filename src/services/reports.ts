import { supabase } from '@/lib/supabase';

export interface Report {
  id: number;
  title: string;
  content: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
}

interface RawReport {
  id: number;
  title: string;
  content: string;
  theme: string;
  created_at: string;
  updated_at: string;
}

function mapReport(raw: RawReport): Report {
  return {
    id: raw.id,
    title: raw.title,
    content: raw.content,
    theme: raw.theme,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export async function getReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data as RawReport[]).map(mapReport);
}

export async function getReport(id: number) {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return mapReport(data as RawReport);
}

export async function createReport(report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('reports')
    .insert([report])
    .select()
    .single();

  if (error) throw error;
  return mapReport(data as RawReport);
}

export async function updateReport(id: number, report: Partial<Omit<Report, 'id' | 'createdAt' | 'updatedAt'>>) {
  const { data, error } = await supabase
    .from('reports')
    .update(report)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapReport(data as RawReport);
}

export async function deleteReport(id: number) {
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
