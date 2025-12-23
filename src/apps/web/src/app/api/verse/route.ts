import { addVerse } from "@/services/verse/addVerse";
import { deleteVerse } from "@/services/verse/deleteVerse";
import { getBibleVerse } from "@/services/verse/getBibleVerse";
import { getVerse } from "@/services/verse/getVerse";
import { BibleVerseT } from "@/types/verse";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { logger } from "@/utils/logger";
import { SuccessResponse } from "@/utils/next-response";
import axios, { AxiosResponse } from "axios";

export async function GET(request: Request) {
  try {
    logger.log(request);
    let response: AxiosResponse<BibleVerseT>;

    try {
      logger.info("Fetching random verse");
      response = await axios.get<BibleVerseT>(
        "https://beta.ourmanna.com/api/v1/get?format=json&order=daily",
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

export async function DELETE(request: Request) {
  try {
    logger.info("Deleting all verses");
    const searchParams = new URL(request.url).searchParams;
    const isAll = searchParams.get("isAll") === "true";
    const id = searchParams.get("id");
    let response;
    if (isAll) {
      response = await deleteVerse({ isAll: true });
      return SuccessResponse({
        data: response,
        message: "Successfully deleted all verses",
      });
    } else if (id) {
      response = await deleteVerse({ id });
      return SuccessResponse({
        data: response,
        message: "Successfully deleted verse",
      });
    }
    return SuccessResponse({
      data: response,
      message: "Successfully deleted verse",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
