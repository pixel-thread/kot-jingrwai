import z from "zod";
import { UUIDSchema } from "../common";
// {
//     "id": "6b0df2cf-41a4-45a3-aaf0-26baacadce91",
//     "verseId": "b178e236-f908-416d-81de-72faa7d0ed92",
//     "createdAt": "2026-02-24T03:44:39.347Z",
//     "updatedAt": "2026-02-24T03:44:39.347Z",
//     "userId": null,
//     "verse": {
//       "id": "b178e236-f908-416d-81de-72faa7d0ed92",
//       "detailsId": "b57371f4-4c6e-4e67-a81f-28194d58db4f",
//       "notice": "Powered by OurManna.com",
//       "createdAt": "2026-02-24T03:44:39.347Z",
//       "updatedAt": "2026-02-24T03:44:39.347Z",
//       "details": {
//         "id": "b57371f4-4c6e-4e67-a81f-28194d58db4f",
//         "text": "But, “Let the one who boasts boast in the Lord.” For it is not the one who commends himself who is approved, but the one whom the Lord commends.",
//         "reference": "2 Corinthians 10:17-18",
//         "version": "NIV",
//         "verseurl": "http://www.ourmanna.com/",
//         "createdAt": "2026-02-24T03:44:39.347Z",
//         "updatedAt": "2026-02-24T03:44:39.347Z"
//       }
//     }
//   }

export const VerseDetailSchema = z.object({
  text: z.string(),
  reference: z.string(),
  version: z.string(),
  verseurl: z.string(),
});

const VerseSchema = z.object({
  notice: z.string(),
  details: VerseDetailSchema,
});

export const VerseResponseSchema = z.object({
  verse: VerseSchema,
});
