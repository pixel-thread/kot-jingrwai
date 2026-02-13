import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { getSongs } from "./getSongs";
import { getUniqueSongs } from "./getUniqueSong";
import { updateSong } from "./updateSong";
import { SongSchema } from "@/utils/validation/songs";
import z from "zod";
import { prisma } from "@/lib/database/prisma";

type UniqueSong = { where: Prisma.SongWhereUniqueInput };

type UpdateUnique = { data: z.infer<typeof SongSchema> };

type CreateSong = { data: Prisma.SongCreateInput };

export const SongService = {
  findUnique: (props: UniqueSong) => getUniqueSongs(props),
  findMany: getSongs,
  update: (props: UpdateUnique) => updateSong(props),
  create: (props: CreateSong) => prisma.song.create({ data: props.data }),
  delete: (props: UniqueSong) => prisma.song.delete(props),
};
