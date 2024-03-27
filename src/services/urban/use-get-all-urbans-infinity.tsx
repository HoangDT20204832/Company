import { useInfiniteQuery } from '@tanstack/react-query';

import urbanService from './urban.service';

const useGetAllUrbansInfinite = (initialPageParam: any) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...result } =
    useInfiniteQuery({
      queryKey: ['getAllUrbansInfinite', initialPageParam],
      queryFn: ({ pageParam = initialPageParam }) =>
        urbanService.getAllInfinity(pageParam, 'GetAllUrbans'),
      getNextPageParam: (lastPage, allPages) => {
        const skipCount = allPages.length * initialPageParam?.maxResultCount;
        return (allPages.length - 1) * 10 + lastPage.data.length !==
          lastPage.totalRecords
          ? {
              ...initialPageParam,
              skipCount: skipCount,
            }
          : undefined;
      },
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...result };
};

export default useGetAllUrbansInfinite;
