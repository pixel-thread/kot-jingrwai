import { songs } from "@libs/songs";
import { logger } from "@repo/utils";

type Props = {
  isChorus?: boolean;
  isAll?: boolean;
};
export function getSongs({ isChorus = false, isAll = false }: Props) {
  if (process.env.NODE_ENV === "development") {
    logger.log("Get Songs", { isChorus, isAll });
  }

  if (isAll) {
    return songs;
  }

  if (songs.length === 0) {
    logger.info("No songs found");
  }

  return songs.filter((song) => song.metadata.isChorus === isChorus);
}
