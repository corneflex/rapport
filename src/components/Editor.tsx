'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          } text-gray-700 dark:text-gray-300`}
        >
          Gras
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          } text-gray-700 dark:text-gray-300`}
        >
          Italique
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          } text-gray-700 dark:text-gray-300`}
        >
          Titre
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          } text-gray-700 dark:text-gray-300`}
        >
          Liste
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert max-w-none p-4 min-h-[200px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
};

export default Editor;
