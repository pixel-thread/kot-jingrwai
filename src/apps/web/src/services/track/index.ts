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

async function deleteSongTrack({ id }: DeleteTrackProps) {
  return await prisma.$transaction(async (tx) => {
    // Delete Song from storage

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

export const TrackService = {
  async getTracks() {
    return await prisma.track.findMany();
  },

  async deleteTrack({ id }: DeleteTrackProps) {
    return await deleteSongTrack({ id });
  },

  async getUniqueTrack({ where }: GetUniqueTrackProps) {
    return await prisma.track.findUnique({ where });
  },
};
