export interface ReservationStatusResponse {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservationDetailsResponse {
  reservations: {
    id: number;
    status: string;
    totalPrice: number;
    headCount: number;
    nickname: string;
    userId: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    activityId: number;
    scheduleId: number;
    reviewSubmitted: boolean;
    teamId: string;
  }[];
  totalCount: number;
  cursorId: number | null;
}
