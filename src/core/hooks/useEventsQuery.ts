import { useQuery } from '@tanstack/react-query';
import { fetchEventsPage, TMEvent } from '../services/api';

export interface UseEventsOptions {
  keyword?: string;
  city?: string;
  enabled?: boolean;
}

export function useEvents({ keyword = '', city = '', enabled = true }: UseEventsOptions) {
  const queryKey = ['events', keyword, city];

  const query = useQuery<TMEvent[], Error>({
    queryKey,
    queryFn: async () => {
      const result = await fetchEventsPage({ keyword, city, page: 0 });
      return result.events; 
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    events: query.data ?? [],
  };
}
