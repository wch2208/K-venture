import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookies } from 'cookies-next';

import { updateAccessToken } from './postApis';

const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  // 쿠키에 저장된 accessToken을 가져와 인증요청에 사용
  const { accessToken } = getCookies();

  // TODO: 토큰이 없을 경우 필요하다면 예외처리 (안내 모달과 함께 로그인 페이지로 리다이렉트)

  // 헤더에 토큰이 설정되지 않은 경우에만 토큰 추가
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const { status, data } = error.response as AxiosResponse;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers._retry && // 한 번 이상 시도 X
      originalRequest.url !== '/auth/tokens' // 토큰 재발급 요청 재시도 X
    ) {
      // 인증 에러가 발생했을 때, 처음이면 accessToken 만료되었을 경우를 대비해
      // 토큰 재발급 받고 한 번 더 시도한다.
      await updateAccessToken();
      originalRequest.headers._retry = true;
      return instance(originalRequest);
    }

    switch (status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 409:
        onError(status, data.message);
        break;
    }

    return Promise.reject(error);
  },
);

export default instance;
