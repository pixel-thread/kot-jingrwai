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

  async dummyCompare() {
    // A standard "fake" hash that looks real to the bcrypt algorithm
    // This hash is for the string "password", but it doesn't matter what it is.
    const FAKE_HASH = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgIcAZGAivFYVNfNvK/67WZv.A1W";

    // We "compare" a random string against the fake hash
    await bcrypt.compare("dummy_password", FAKE_HASH);

    // Always return false because this is only called when a user doesn't exist
    return false;
  },
};
