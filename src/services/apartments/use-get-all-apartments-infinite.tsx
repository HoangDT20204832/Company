import { useInfiniteQuery } from '@tanstack/react-query';

import apartmentService from './apartment.service';

type TUseGetAllApartmentInfinite = {
  skipCount?: number;
  urbanId?: number;
  BuildingId?: number;
  maxResultCount: number;
  Keyword?: number;
};

const useGetAllApartmentsInfinite = (
  initialPageParam: TUseGetAllApartmentInfinite,
) => {
  console.log(initialPageParam, 'Dữ liệu đầu truyền vào');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...result } =
    useInfiniteQuery({
      queryKey: ['getAllApartmentInfinite', initialPageParam],
      queryFn: ({ pageParam = initialPageParam }) =>
        apartmentService.getAllInfinity(pageParam, '/GetAllApartment'),
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

export default useGetAllApartmentsInfinite;
