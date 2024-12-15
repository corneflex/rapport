'use client';

import { cn } from '@/lib/utils';

const themes = {
  modern: {
    container: 'bg-white dark:bg-gray-800',
    title: 'text-gray-800 dark:text-white',
    content: 'prose dark:prose-invert',
  },
  classic: {
    container: 'bg-slate-50 dark:bg-slate-900',
    title: 'text-slate-800 dark:text-slate-200 font-serif',
    content: 'prose dark:prose-invert font-serif',
  },
  minimal: {
    container: 'bg-neutral-50 dark:bg-neutral-900',
    title: 'text-neutral-800 dark:text-neutral-200',
    content: 'prose dark:prose-invert prose-sm',
  },
  cyberpunk: {
    container: 'bg-black dark:bg-black border-2 border-cyan-500 dark:border-cyan-500',
    title: 'text-cyan-500 dark:text-cyan-400 font-mono',
    content: 'prose-cyan dark:prose-invert font-mono [&>*]:text-cyan-300 [&>h1]:text-pink-500 [&>h2]:text-purple-500 [&>h3]:text-blue-500 [&>a]:text-yellow-400 [&>blockquote]:border-pink-500 [&>pre]:bg-gray-900 [&>pre]:border [&>pre]:border-cyan-800',
  },
};

export type ThemeType = keyof typeof themes;

interface ReportThemeProps {
  theme: ThemeType;
  children: React.ReactNode;
  className?: string;
}

export function ReportTheme({ theme, children, className }: ReportThemeProps) {
  const themeClasses = themes[theme] || themes.modern;

  return (
    <div className={cn(themeClasses.container, 'rounded-lg shadow-md p-8', className)}>
      {children}
    </div>
  );
}

export function ReportTitle({ theme, children, className }: ReportThemeProps) {
  const themeClasses = themes[theme] || themes.modern;

  return (
    <h1 className={cn(themeClasses.title, 'text-3xl font-bold mb-4', className)}>
      {children}
    </h1>
  );
}

export function ReportContent({ theme, children, className }: ReportThemeProps) {
  const themeClasses = themes[theme] || themes.modern;

  return (
    <div className={cn(themeClasses.content, 'max-w-none', className)}>
      {children}
    </div>
  );
}
