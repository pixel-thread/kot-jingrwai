import { addVerse } from "@/services/verse/addVerse";
import { getBibleVerse } from "@/services/verse/getBibleVerse";
import { getVerse } from "@/services/verse/getVerse";
import { BibleVerseT } from "@/types/verse";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { logger } from "@/utils/logger";
import { requiredRole } from "@/utils/middleware/requireRole";
import { SuccessResponse } from "@/utils/next-response";
import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await requiredRole(request, "NONE");
    let response: AxiosResponse<BibleVerseT>;

    try {
      logger.info("Fetching random verse");
      response = await axios.get<BibleVerseT>(
        "https://beta.ourmanna.com/api/v1/get?format=json&order=daily"
      );
      logger.info("Successfully fetched random verse from api");
    } catch (error) {
      logger.log(error);
      const dbVerse = await getBibleVerse();
      return SuccessResponse({
        data: dbVerse,
        message: "Successfully fetched verse from database.",
      });
    }

    logger.info("Adding verse to db");
    const data = response.data;
    const text = data.verse.details.text;
    const reference = data.verse.details.reference;
    const verseDetail = await getVerse({
      where: {
        text,
        reference,
      },
    });

    const verse = await addVerse({
      where: { verseId: verseDetail?.verse?.id || "" },
      update: {
        verse: {
          update: {
            notice: data.verse.notice,
            details: {
              update: {
                text: text,
                reference: reference,
                version: data.verse.details.version,
                verseurl: data.verse.details.verseurl,
              },
            },
          },
        },
      },
      create: {
        verse: {
          create: {
            notice: data.verse.notice,
            details: {
              create: {
                text: text,
                reference: reference,
                version: data.verse.details.version,
                verseurl: data.verse.details.verseurl,
              },
            },
          },
        },
      },
    });
    logger.info("Successfully added verse to db");

    return SuccessResponse({
      data: verse,
      message: "Successfully fetched verse.",
    });
  } catch (error) {
    logger.error("Error While Getting Bible verse");
    return handleApiErrors(error);
  }
}
