import { addVerse } from "@/services/verse/addVerse";
import { getBibleVerse } from "@/services/verse/getBibleVerse";
import { getVerse } from "@/services/verse/getVerse";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { logger } from "@/utils/logger";
import { requiredRole } from "@/utils/middleware/requireRole";
import { SuccessResponse } from "@/utils/next-response";
import axios from "axios";
import { NextRequest } from "next/server";
import { VerseResponseSchema } from "@repo/utils";
import { sanitize } from "@/utils/helper/sanitize";
import { z } from "zod";
import { withValidation } from "@/utils/middleware/withValidiation";

const ExternalVerseSchema = z.object({
  verse: z.object({
    notice: z.string(),
    details: z.object({
      text: z.string(),
      reference: z.string(),
      version: z.string(),
      verseurl: z.string(),
    }),
  }),
});

export const GET = withValidation({}, async () => {
  let apiData;

  try {
    const response = await axios.get(
      "https://beta.ourmanna.com/api/v1/get?format=json&order=daily",
      { timeout: 5000 }
    );

    const parsed = ExternalVerseSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new Error(
        `Invalid payload structure from external API. Issues: ${parsed.error.message}`
      );
    }
    apiData = parsed.data;
  } catch (e) {
    logger.error("Error fetching or validating verse from API.", e);
    const dbVerse = await getBibleVerse();
    return SuccessResponse({
      data: dbVerse,
      message: "Successfully fetched verse from database.",
    });
  }

  const { notice, details } = apiData.verse;
  const { text, reference, version, verseurl } = details;

  const verseDetail = await getVerse({
    where: { text, reference },
  });

  const verse = await addVerse({
    where: { verseId: verseDetail?.verse?.id || "" },
    update: {
      verse: {
        update: {
          notice,
          details: {
            update: { text, reference, version, verseurl },
          },
        },
      },
    },
    create: {
      verse: {
        create: {
          notice,
          details: {
            create: { text, reference, version, verseurl },
          },
        },
      },
    },
  });

  return SuccessResponse({
    data: sanitize(VerseResponseSchema, verse),
    message: "Successfully fetched verse.",
  });
});
