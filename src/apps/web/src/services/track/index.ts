import { env } from "@/env";
import { prisma } from "@/lib/database/prisma";
import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { supabase } from "@/lib/supabase";
import { logger } from "@repo/utils";

type DeleteTrackProps = {
  id: string;
};

type GetUniqueTrackProps = {
  where: Prisma.TrackWhereUniqueInput;
};

type CreateTrackProps = {
  data: { songId: string };
  metadata: Prisma.TrackMetadataCreateInput;
};

async function createTrack({ data, metadata }: CreateTrackProps) {
  return await prisma.$transaction(async (tx) => {
    const meta = await tx.trackMetadata.create({ data: metadata });

    const track = await tx.track.create({
      data: {
        songs: { connect: { id: data.songId } },
        metadata: { connect: { id: meta.id } },
      },
      include: { metadata: true },
    });

    await tx.trackMetadata.update({
      where: { id: meta.id },
      data: { trackId: track.id },
    });

    return track;
  });
}

async function deleteSongTrack({ id }: DeleteTrackProps) {
  return await prisma.$transaction(async (tx) => {
    const track = await tx.track.findUnique({
      where: { id: id },
      include: { metadata: true },
    });

    if (track) {
      try {
        const { error } = await supabase.storage
          .from(env.SUPABASE_BUCKET)
          .remove([track?.metadata.fullPath]);

        if (error) {
          logger.error("Error deleting song from storage", { error });
          throw error;
        }
      } catch (error) {
        logger.error("Error deleting song from storage", { error });
        throw error;
      }
    }

    await tx.song.updateMany({
      where: { trackId: id },
      data: { trackId: null },
    });

    await tx.track.deleteMany({
      where: { id: id },
    });

    await tx.trackMetadata.deleteMany({
      where: { trackId: id },
    });
    return track;
  });
}

function getFilePublicUrl(path: string) {
  return supabase.storage.from(env.SUPABASE_BUCKET).getPublicUrl(path);
}

export const TrackService = {
  getPublicUrl(path: string) {
    return getFilePublicUrl(path);
  },

  async getTracks() {
    return await prisma.track.findMany();
  },

  async deleteTrack({ id }: DeleteTrackProps) {
    return await deleteSongTrack({ id });
  },

  async createTrack({ data, metadata }: CreateTrackProps) {
    return await createTrack({ data, metadata });
  },

  async getUniqueTrack({ where }: GetUniqueTrackProps) {
    return await prisma.track.findUnique({ where });
  },
};
