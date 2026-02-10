import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";
import { env } from "@/env";

const accessSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET!);

const refreshSecret = new TextEncoder().encode(env.JWT_REFRESH_SECRET!);

const ACCESS_TTL = Number(env.ACCESS_TOKEN_TTL);
const REFRESH_TTL = Number(env.REFRESH_TOKEN_TTL);

export type TokenPayload = {
  userId: string;
};

export const JWT = {
  async signAccessToken(payload: TokenPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(`${ACCESS_TTL}s`)
      .sign(accessSecret);
  },

  async signRefreshToken(payload: TokenPayload) {
    const signedToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(`${REFRESH_TTL}s`)
      .sign(refreshSecret);

    return this.hash(signedToken);
  },

  async verifyAccessToken(token: string) {
    const { payload } = await jwtVerify(token, accessSecret);
    return payload as TokenPayload;
  },

  async verifyRefreshToken(token: string) {
    const { payload } = await jwtVerify(token, refreshSecret);
    return payload as TokenPayload;
  },

  async hash(token: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const content = token + salt;
    return crypto.createHash("sha256").update(content).digest("hex");
  },
};
