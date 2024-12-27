import { useState, useEffect } from 'react';
import { useSupabaseQuery } from '@/lib/hooks/useSupabaseQuery';
import { supabase } from '@/lib/supabase';
import type { StakeholderStats } from '../types';

export function useStakeholderStats() {
  const [stats, setStats] = useState<StakeholderStats>({
    total: 0,
    contributors: 0,
    leadership: 0,
  });

  const { execute, isLoading, error } = useSupabaseQuery({
    onError: (err) => console.error('Error fetching stakeholder stats:', err)
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const data = await execute(async () => {
        // First get all documents owned by the user
        const { data: documents, error: docsError } = await supabase
          .from('documents')
          .select('id')
          .eq('user_id', user.id);

        if (docsError) throw docsError;

        if (!documents?.length) {
          return { data: [], error: null };
        }

        // Then get stakeholder stats for these documents
        return supabase
          .from('stakeholders')
          .select('role')
          .in('document_id', documents.map(d => d.id));
      });

      if (data) {
        const counts = data.reduce((acc, { role }) => {
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          total: data.length,
          contributors: counts.contributor || 0,
          leadership: counts.leadership || 0,
        });
      }
    };

    fetchStats();
  }, [execute]);

  return { stats, isLoading, error };
}