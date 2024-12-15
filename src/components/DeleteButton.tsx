'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
  reportId: number;
}

export default function DeleteButton({ reportId }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/reports/${reportId}/delete`, {
        method: 'DELETE',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      // Attendre un court instant pour s'assurer que la suppression est bien prise en compte
      await new Promise(resolve => setTimeout(resolve, 500));

      // Rediriger vers la page d'accueil
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Une erreur est survenue lors de la suppression du rapport');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </button>
  );
}
