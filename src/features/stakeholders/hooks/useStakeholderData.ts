import { useState, useEffect } from 'react';
import { useSupabaseQuery } from '@/lib/hooks/useSupabaseQuery';
import { supabase } from '@/lib/supabase';
import type { Stakeholder } from '@/types/database';

export function useStakeholderData(documentId?: string) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const { execute, isLoading, error } = useSupabaseQuery({
    onError: (err) => console.error('Error fetching stakeholders:', err)
  });

  useEffect(() => {
    if (!documentId) return;

    const fetchStakeholders = async () => {
      const data = await execute(() => 
        supabase
          .from('stakeholders')
          .select('*')
          .eq('document_id', documentId)
          .order('created_at', { ascending: true })
      );

      if (data) {
        setStakeholders(data);
      }
    };

    fetchStakeholders();

    // Set up realtime subscription
    const subscription = supabase
      .channel(`stakeholders_${documentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stakeholders',
          filter: `document_id=eq.${documentId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setStakeholders((current) => [...current, payload.new as Stakeholder]);
          } else if (payload.eventType === 'DELETE') {
            setStakeholders((current) =>
              current.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [documentId, execute]);

  return { stakeholders, isLoading, error };
}