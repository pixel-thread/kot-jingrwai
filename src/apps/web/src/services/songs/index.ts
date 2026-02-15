import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { getSongs } from "./getSongs";
import { getUniqueSongs } from "./getUniqueSong";
import { updateSong } from "./updateSong";
import z from "zod";
import { prisma } from "@/lib/database/prisma";
import { createSong } from "./createSong";
import { SongSchema } from "@repo/utils";

type UniqueSong = { where: Prisma.SongWhereUniqueInput };

type UpdateUnique = { data: Required<z.infer<typeof SongSchema>> };

type CreateSong = { data: z.infer<typeof SongSchema> };

export const SongService = {
  findUnique: (props: UniqueSong) => getUniqueSongs(props),
  findMany: getSongs,
  update: (props: UpdateUnique) => updateSong(props),
  create: (props: CreateSong) => createSong({ body: props.data }),
  delete: (props: UniqueSong) => prisma.song.delete(props),
};
