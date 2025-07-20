import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEventsPage, PageResponse } from '../services/api';

export function useInfiniteEvents(keyword = '', city = '') {
  return useInfiniteQuery<PageResponse, Error>({
    queryKey: ['events', keyword, city],
    queryFn: ({ pageParam = 0 }) =>
      fetchEventsPage({ keyword, city, page: pageParam as number, size: 10 }),
    getNextPageParam: (last) =>
      last.page + 1 < last.totalPages ? last.page + 1 : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
}
