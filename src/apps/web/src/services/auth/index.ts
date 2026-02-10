import { prisma } from "@libs/database/prisma";
import { Prisma, $Enums } from "@libs/database/prisma/generated/prisma";
import { BcryptService } from "@libs/auth/bcrypt";

type UniqueAuthProps = {
  where: Prisma.AuthWhereUniqueInput;
};

type AuthProps = {
  where?: Prisma.AuthWhereInput;
};

type CreateUserT = {
  email: string;
  password: string;
  name: string;
  role?: $Enums.Role;
};

type UpdateUnique = {
  authId: string;
  password: string;
};

export const AuthServices = {
  async updateUnique({ password, authId }: UpdateUnique) {
    const hashPassword = await BcryptService.hash(password);

    return await prisma.$transaction(async (tx) => {
      await tx.auth.update({
        where: { id: authId },
        data: { hashPassword: hashPassword },
      });
    });
  },

  async getUnique({ where }: UniqueAuthProps) {
    return await prisma.auth.findUnique({
      where,
      include: {
        user: {
          omit: {
            authId: true,
          },
        },
      },
    });
  },

  async getAuths({ where }: AuthProps = { where: {} }) {
    return await prisma.auth.findMany({ where });
  },

  async create(data: CreateUserT) {
    const password = data.password;
    const hashPassword = await BcryptService.hash(password);

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          role: data.role || "USER",
        },
      });

      // create auth for user
      const auth = await tx.auth.create({
        data: {
          hashPassword: hashPassword,
          email: data.email,
          user: { connect: { id: user.id } },
        },
      });

      // connect user after auth is created
      await tx.user.update({
        where: { id: user.id },
        data: { authId: auth.id },
      });
    });
  },
};
