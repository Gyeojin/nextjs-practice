import { API_URL } from '../../../(home)/page';

async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return await response.json();
}

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  // Promise.all 병렬처리
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  console.log(id);
  return <h1>{movie.title}</h1>;
}
