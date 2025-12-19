import { tynraiJingrwai } from '~/src/libs/tynrai-jingrwai';
import { logger } from '~/src/utils/logger';

type Props = {
  id: string;
};

export async function getTynraiJingrwaiById({ id }: Props) {
  try {
    return tynraiJingrwai.find((item) => item.id === id);
  } catch (error) {
    logger.error('🚀 ~ getTynraiJingrwai ~ error', error);
  }
}
