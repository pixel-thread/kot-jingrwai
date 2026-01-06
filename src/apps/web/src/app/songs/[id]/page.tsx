import SongDetail from "@/components/page/songs/SongDetail";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <SongDetail id={id} />;
}
