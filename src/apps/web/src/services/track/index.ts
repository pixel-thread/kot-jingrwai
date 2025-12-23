import { prisma } from "@/lib/database/prisma";

export const TrackService = {
  async getTracks() {
    return await prisma.track.findMany();
  },
};
