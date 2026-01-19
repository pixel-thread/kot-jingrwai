import { SongT } from "@repo/types";

export const apostleCreed: SongT = {
  id: "apostles-creed",
  title: "KA JINGPHLA KA JINGNGEIT KI APOSTOL",
  metadata: {
    id: "apostles-creed",
    number: 1,
    language: "khasi",
    songId: "apostles-creed",
    tags: ["creed", "religious", "apostles"],
    reference: "The Apostles' Creed",
  },
  paragraphs: [
    {
      id: "para-1",
      order: 1,
      lines: [
        {
          text: "Nga ngeit ha U Blei U Kpa Badonbor baroh, U Nongthaw ka bneng bad ka khyndew:",
          order: 1,
          id: "line-1",
          paragraphId: "para-1",
        },
      ],
      type: "VERSE",
    },
    {
      id: "para-2",
      order: 2,
      lines: [
        {
          id: "line-2",
          order: 2,
          text: "Bad ha U Jisu Khrist U Khun ba tang marwei jong U, U Trai jong ngi Uba la pun da U Mynsiem Bakhuid, Uba la kha na ka Mari Theisotti Uba la shah shitom ha U Pontios Pilat, la Sahnarphna ia U, U la iap bad la tep ia U; U la hiar sha ki riewiap; U la mihpat na kiba iap ha ka Sngi kaba lai, U la kiew sha bneng bad U la shong ha ka kti kamon U Blei U Kpa Badonbor baroh; nangta Un wan ban bishar ia kiba im bad kiba iap.",
          paragraphId: "para-2",
        },
      ],
      type: "VERSE",
    },
    {
      id: "para-3",
      order: 3,
      lines: [
        {
          id: "line-1",
          text: "Nga ngeit ha U Mynsiem Bakhuid, ka Balang Bakhuid shi tyllup ka pyrthei, ka Jingiasyllok ki riewkhuid, ka jingmap ia ki pop; ka jingmihpat jong ka met, bad ka jingim bymjukut.",
          order: 3,
          paragraphId: "para-3",
        },
      ],
      type: "VERSE",
    },
  ],
};
