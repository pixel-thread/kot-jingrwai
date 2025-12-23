import SongsLayout from "@/components/page/songs/SongLayout";

type Props = {
  children: React.ReactNode;
};
export default function SongsPage({ children }: Props) {
  return <SongsLayout>{children}</SongsLayout>;
}
