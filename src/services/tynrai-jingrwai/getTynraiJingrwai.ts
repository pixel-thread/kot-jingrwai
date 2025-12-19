import { tynraiJingrwai } from '~/src/libs/tynrai-jingrwai';
import { logger } from '~/src/utils/logger';

export async function getTynraiJingrwai() {
  try {
    return tynraiJingrwai;
  } catch (error) {
    logger.error('🚀 ~ getTynraiJingrwai ~ error', error);
  }
}
