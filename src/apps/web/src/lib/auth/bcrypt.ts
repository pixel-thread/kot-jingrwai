import bcrypt from "bcrypt";
import { env } from "@/env";

export const BcryptService = {
  async generateSalt() {
    return await bcrypt.genSalt(env.SALT);
  },

  async hash(password: string) {
    const salt = await this.generateSalt();
    return await bcrypt.hash(password, salt);
  },

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  },
};
