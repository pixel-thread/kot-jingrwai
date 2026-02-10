import { prisma } from "@libs/database/prisma";
import { calculateTokenExpiry } from "@utils/helper/calculateTokenExpire";
import { env } from "@src/env";
import { Prisma } from "@libs/database/prisma/generated/prisma";

type CreateProps = {
  hash: string;
  userId: string;
  authId: string;
};

type UpdateProps = {
  where: Prisma.TokenWhereUniqueInput;
  data: Prisma.TokenUpdateInput;
};

type UpdateManyProps = {
  where: Prisma.TokenWhereInput;
  data: Prisma.TokenUpdateInput;
};

export const TokenServices = {
  async updateUnique({ where, data }: UpdateProps) {
    return await prisma.token.update({ where, data });
  },

  async updateMany({ where, data }: UpdateManyProps) {
    return await prisma.token.updateMany({ where, data });
  },

  async getUnique({ where }: { where: Prisma.TokenWhereUniqueInput }) {
    return await prisma.token.findUnique({ where });
  },

  async createToken({ hash, userId, authId }: CreateProps) {
    return await prisma.$transaction(async (tx) => {
      // Revoke all active tokens for user
      await tx.token.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true },
      });

      // Create new token
      await tx.token.create({
        data: {
          hash,
          expiresAt: calculateTokenExpiry(env.REFRESH_TOKEN_TTL, "seconds"),
          userId,
          authId,
        },
      });
    });
  },
};
