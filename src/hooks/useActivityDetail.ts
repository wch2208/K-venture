import { UseQueryResult } from '@tanstack/react-query';

import useFetchData from '@/hooks/useFetchData';
import { getActivityDetail } from '@/lib/apis/getApis';
import { ActivityResponse } from '@/types/activityDetailPageTypes';

export const useActivityDetail = (
  activityId: number,
  options: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    onSuccess?: (data: ActivityResponse) => void;
    onError?: (error: Error) => void;
  },
): UseQueryResult<ActivityResponse, Error> => {
  return useFetchData<ActivityResponse>(
    ['activity', activityId],
    () => getActivityDetail(activityId),
    options,
  );
};
