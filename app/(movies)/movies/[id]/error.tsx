// error.tsx는 무조건 use client 모드인 이유
// error.tsx는 단순한 에러 페이지가 아니라 “라우트 단위 Error Boundary”이기 때문에, Error Boundary가 될 수 있는 Client Component여야 해서 use client가 필수다.

'use client';

export default function MovieDetailError() {
  return <h1>Failed to load movie videos. Please try again later.</h1>;
}
