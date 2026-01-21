import { Suspense } from 'react';
import MovieInfo from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-videos';

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  // Promise.all 병렬처리
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  return (
    <div>
      <Suspense fallback={<h1>Loading Movie Info...</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading Movie Videos...</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
