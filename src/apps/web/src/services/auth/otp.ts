import { prisma } from "@libs/database/prisma";
import { Prisma } from "@libs/database/prisma/generated/prisma";

type Create = {
  data: Prisma.otpCreateInput;
};

type FindUnique = {
  where: Prisma.otpWhereUniqueInput;
};

type FindFirst = {
  where: Prisma.otpWhereInput;
};

type Update = {
  data: Prisma.otpUpdateInput;
  where: Prisma.otpWhereUniqueInput;
};

export const OtpServices = {
  async create(props: Create) {
    await prisma.otp.updateMany({
      where: { isRevoked: false },
      data: { isRevoked: true },
    });
    return await prisma.otp.create(props);
  },
  async findUnique(props: FindUnique) {
    return await prisma.otp.findUnique(props);
  },
  async findFirst(props: FindFirst) {
    return await prisma.otp.findFirst(props);
  },
  async update(props: Update) {
    return await prisma.otp.update(props);
  },
};
