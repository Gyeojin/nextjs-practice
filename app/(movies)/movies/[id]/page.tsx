import { ScriptProps } from 'next/script';

export default function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log(id);
  return <h1>Movie Detail Page {id}</h1>;
}
