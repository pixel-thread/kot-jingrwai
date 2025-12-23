import { $Enums } from "@/lib/database/prisma/generated/prisma";

export type Line = {
  id?: string;
  order: number;
  text: string;
};

export type SongParagraph = {
  id?: string; // unique id for each paragraph
  order: number; // display order
  lines: string[]; // lines of lyrics
  type?: $Enums.VerseType;
  songId?: string;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
};

export type SongMetadata = {
  id?: string;
  number: number; // song number/index
  oldNumber?: number | null;
  isChorus?: boolean;
  language: string; // e.g. 'en', 'kn', 'khasi'
  author?: string;
  composer?: string;
  tags?: string[]; // optional categories/tags
  songId?: string | null;
  syllables?: string | null;
  reference?: string | null;
  tune?: string | null;
  meter?: string | null;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
};

export type SongT = {
  id?: string;
  title: string;
  metadata: SongMetadata;
  paragraphs: SongParagraph[];
  isChorus?: boolean;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
  trackId?: string | null;
  track?: null;
  metadataId?: string | null;
};

export const khoros: SongT[] = [
  {
    id: "khoros-1",
    title: "Jingaiei ka don ka ram ban siew",
    metadata: {
      number: 1,
      isChorus: true,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Jingaiei ka don ka ram ban siew,`,
          `Snam ban sait phar ïa ka jinglong sniew,`,
          `Bor ban kyrshan, katba im u briew,`,
          `U Khrist ïa nga.`,
        ],
      },
    ],
  },
  {
    id: "khoros-2",
    title: "Shaniah skhem, la jur ka jingïaleh",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 2,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Shaniah skhem, la jur ka jingïaleh,`,
          `Shaniah skhem ha lynti kaba eh,`,
          `Shaniah skhem, U long uba ïaineh`,
          `Shisha tang h'U Jisu.`,
        ],
      },
    ],
  },
  {
    id: "khoros-3",
    title: "Ah ka snam, ka snam kordor",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 3,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Ah ka snam, ka snam kordor,`,
          `Ba la mih na Kalbari !`,
          `Ka long ka kuna kaba kor,`,
          `Da ka jingngeit nga ïohi.`,
        ],
      },
    ],
  },
  {
    id: "khoros-4",
    isChorus: true,
    title: "Kut la ka jingleit",
    metadata: {
      isChorus: true,
      number: 4,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Kut la ka jingleit,`,
          `Phong la pansngiat,`,
          `Ha shnong Jerusalem;`,
          `Sha lyndet ka Jordan,`,
          `Ngin ïa shem bad U Jisu,`,
          `Ngin ïoh shongthait ha byneng.`,
        ],
      },
    ],
  },
  {
    id: "khoros-5",
    title: "Nga bam ka manna b'la buhrieh",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 5,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Nga bam ka manna b'la buhrieh,`,
          `Na ki wah um ba im nga dih;`,
          `‘Naba uba dih’ U Khrist U ong,`,
          `‘Junom um sliang shuh’.`,
        ],
      },
    ],
  },
  {
    id: "khoros-6",
    isChorus: true,
    title: "Ym dei ma ba phylla, ba phylla, ba phylla",
    metadata: {
      isChorus: true,
      number: 6,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Ym dei ma ba phylla, ba phylla, ba phylla,`,
          `Trai Jisu U long Uba phylla,`,
          `Khmat ngi i, shkor ngi sngew,`,
          `La thoh ha ka Ktien jong U,`,
          `Trai Jisu U long Uba phylla,`,
        ],
      },
    ],
  },
  {
    id: "khoros-7",
    title: "Baphylla, baphylla, Jisu long ha nga",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 7,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Baphylla, baphylla, Jisu long ha nga,`,
          `Nongsylla, Syiem jingsuk, Blei khrawbor U long;`,
          `U pynim, U sumar na ka pop ka sniew,`,
          `Baphylla, U Nongsiewspah, 'Їaroh ï'U Trai'.`,
        ],
      },
    ],
  },
  {
    id: "khoros-8",
    isChorus: true,
    title: "Oh! Katno nga kwah peit ïa ka khmat jong U",
    metadata: {
      isChorus: true,
      number: 8,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Oh! Katno nga kwah peit ïa ka khmat jong U,`,
          `Ngan ïoh ïaroh junom jingisnei jong U;`,
          `Lynti sha ka burom lynter ngan ïai rwai,`,
          `Їing ha bneng, ngan ïoh shong, junom bad U Trai.`,
        ],
      },
    ],
  },
  {
    id: "khoros-9",
    isChorus: true,
    title: "Namar ngin sa ïoh ïa shong lang",
    metadata: {
      isChorus: true,
      number: 9,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Namar ngin sa ïoh ïa shong lang,`,
          `Katno jingsuk ngin long,`,
          `Junom ha bymjukut;`,
          `Namar ngin sa ïoh ïa shong lang`,
          `Lem bad U Trai.`,
        ],
      },
    ],
  },
  {
    id: "khoros-10",
    title: "Nga kham ieit ïa U man ka sngi",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 10,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Nga kham ieit ïa U man ka sngi,`,
          `Nga kham ieit ïa U man ka sngi;`,
          `Syndah bad U ngan ïoh shong duh,`,
          `Nga kham ieit ïa U man ka sngi.`,
        ],
      },
    ],
  },
  {
    id: "khoros-11",
    title: "Man ka sngi bad Jisu, jingim bahun dei tang bad U",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 11,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Man ka sngi bad Jisu, jingim bahun dei tang bad U,`,
          `Man ka sngi bad Jisu, nga nang kham ieitïaU;`,
          `Jingsumar babha tam, bad tang ïa U hi nga da kwah,`,
          `Man ka sngi bad Jisu, jingim bahun dei tang bad U.`,
        ],
      },
    ],
  },
  {
    id: "khoros-12",
    isChorus: true,
    title: "Shaniah h'U Trai wat sngew khuslai",
    metadata: {
      isChorus: true,
      number: 12,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Shaniah h'U Trai wat sngew khuslai,`,
          `U long lok ba shisha, Haleluïa,`,
          `La bun kam pher ki jingjynjar, Jisu U pyllait phar`,
          `Rwai ha jingshai ka sngi,rwai ha jingdum ka miet,`,
        ],
      },
    ],
  },
  {
    id: "khoros-13",
    isChorus: true,
    title: "Blei U ieit ka pyrthei, U ai ï'U Khun marwei",
    metadata: {
      isChorus: true,
      number: 13,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Blei U ieit ka pyrthei, U ai ï'U Khun marwei;`,
          `Ban ïap ha ka diengphna, ban pyllait phar ïa nga,`,
          `Un sa wan pat shisha ha burom ba phylla,`,
          `Jingieit ba phylla ïa nga.`,
        ],
      },
    ],
  },
  {
    id: "khoros-14",
    title: "Oh! Їaroh ï'U Blei b'U la pynim ïa nga",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 14,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Oh! Їaroh ï'U Blei b'U la pynim ïa nga,`,
          `B'U la pynim ïa nga, nga tip,`,
          `Da la kti U kner, U la pynim ïa nga,`,
          `Bad kumta nga ieit ïa U,`,
          `Nga nang kham ieit ïa U (2 sien)`,
          `Ha akher ka sngi ngan ïeng ha khmat jong U (2 Sien)`,
          `Ngan ïai ïaroh ïa U. (2 Sien)`,
        ],
      },
    ],
  },
  {
    id: "khoros-15",
    title: "Shisha jingbha bad jingisnei kin bud ïa nga",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 15,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Shisha jingbha bad jingisnei kin bud ïa nga. (2 Sien)`,
          `Shisha jingbha bad jingisnei kin bud ïa nga. (2 Sien)`,
          `Shilynter ki sngi jingim jong nga,`,
          `Bad ngan sa shong ha ka ïing jong U Trai shi junom,`,
        ],
      },
    ],
  },
  {
    id: "khoros-16",
    title: "Pynlong ïa nga Trai, jingim kum jingrwai",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 16,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Pynlong ïa nga Trai, jingim kum jingrwai,`,
          `Ka ban ïai pynsawa khubor ka diengphna,`,
          `Shah ïa nga Ah Trai, ban long kum jingrwai;`,
          `Ka ban ïai sawa haduh ha la ka rta`,
          `Bad Jisu ban shong khet ha ka dohnud jong nga,`,
          `U lah ïa dohnud sngewsih ban pynsngewbha,`,
          `Shah ïa nga Ah Trai, ban long kum jingrwai,`,
          `Ka ban ïai pynsawa khubor ka diengphna.`,
        ],
      },
    ],
  },
  {
    id: "khoros-17",
    title: "Wad shuwa ïa ka hima U Blei",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 17,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Wad shuwa ïa ka hima U Blei,`,
          `Wad shuwa, wad shuwa.`,
          `Wad shuwa, bad ïa ka hok jong U,`,
          `Wad shuwa, wad shuwa, bad ïa baroh,`,
          `Yn sa ai lang tam ha phi, (3 sien)`,
          `Bad ïa baroh yn sa ai lang tam ha phi`,
          `Blei U ong kumta, Haleuïa,`,
          `Wad shuwa ïa ka hima U Blei.`,
        ],
      },
    ],
  },
  {
    id: "khoros-18",
    title: "Їaid bad U Jisu",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 18,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Їaid bad U Jisu,`,
          `Їaid man la ka sngi, ïaid tang bad U hi,`,
          `Їaid bad U Jisu,`,
          `Їaid lang tang bad U Jisu.`,
          `Їaid ha jingshai ka sngi, ïaid ha jingdum ka miet,`,
          `Їaid man la ka sngi, ïaid tang bad U hi,`,
          `Їaid ha jingshai ka sngi, ïaid ha jingdum ka miet,`,
          `Їaid lang tang bad U Jisu.`,
        ],
      },
    ],
  },
  {
    id: "khoros-19",
    title: "Ai jingbhabriew U Jisu yn i ha nga",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 19,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Ai jingbhabriew U Jisu yn i ha nga,`,
          `Dur ieit ba sngewrit, batlem bad ba shisha;`,
          `Ah! Me Mynsiem U Blei, jinglong jong nga to trei,`,
          `Haduh jingbhabriew Jisu yn i ha nga.`,
        ],
      },
    ],
  },
  {
    id: "khoros-20",
    isChorus: true,
    title: "Mynhynnin, mynta, bymjukut, Jisu long kumjuh",
    metadata: {
      isChorus: true,
      number: 20,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Mynhynnin, mynta, bymjukut, Jisu long kumjuh,`,
          `Baroh kylla, Jisu te em, ïaroh ïa U Blei,`,
          `Їaroh ïa U Blei, ïaroh ïa U Blei,`,
          `Baroh kylla, Jisu te em, ïaroh ïa U Blei.`,
        ],
      },
    ],
  },
  {
    id: "khoros-21",
    title: "La shim noh, la shim noh, la shim noh",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 21,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `La shim noh, la shim noh, la shim noh, (2 sien)`,
          `Jingkit hapoh ka dohnud la shim, noh, (2 sien)`,
          `Pop jong nga baroh la sait da ka snam,`,
          `Haleluïa, la shim noh, la shim noh, la shim noh,`,
          `Jingkit ka pop na dohnud la shim noh.`,
        ],
      },
    ],
  },
  {
    id: "khoros-22",
    title: "Halelu, Halelu, Halelu, Haleluïa, ïaroh ï'U Trai",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 22,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Halelu, Halelu, Halelu, Haleluïa, ïaroh ï'U Trai, (2 sien)`,
          `Їaroh ï'U Trai,Haleluïa, (3 sien)`,
          `Їaroh ï'U Trai.`,
        ],
      },
    ],
  },
  {
    id: "khoros-23",
    title: "Rupa bad ka ksiar ngam don, kaba nga don nga",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 23,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Rupa bad ka ksiar ngam don, kaba nga don nga ai ha Me,`,
          `Ha kyrteng U Jisu Khrist, Uba na Nasareth, to ïaid;`,
          `To ïeng, rynsied, bad ïaroh ï'U Trai, (2 sien)`,
          `Ha kyrteng U Jisu Khrist, Uba na Nasareth, to ïaid.`,
        ],
      },
    ],
  },
  {
    id: "khoros-24",
    title: "Haba U khot nga ngan jubab",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 24,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Haba U khot nga ngan jubab, (3 sien)`,
          `Ngan trei kat sha ba phah U Trai.`,
          `Ngan trei kat sha b'Un phah (2 sien)`,
          `Ngan trei kat sha ba phah U Trai.`,
        ],
      },
    ],
  },
  {
    id: "khoros-25",
    title: "Nga don ka ïing shongneh haneng kham phyrnai",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 25,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Nga don ka ïing shongneh haneng kham phyrnai ïa ka sngi (3 sien)`,
          `Sha lyndet ki lyoh,`,
          `Ah Trai, Oh Ah Trai, Ah to kynmaw ïa nga (3 Sien)`,
          `Sha lyndet ki lyoh`,
          `Ah Trai, Oh Ah Trai, Ah to kynmaw ïa nga (3 Sien)`,
          `Sha lyndet ki lyoh.`,
        ],
      },
    ],
  },
  {
    id: "khoros-26",
    isChorus: true,
    title: "O! Sngi baphylla, ka sngi baphylla",
    metadata: {
      isChorus: true,
      number: 26,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          "O! Sngi baphylla, ka sngi baphylla,",
          "Ngam klet ha jingim jong nga,",
          "Haba nga la ïaid sakma noh la slem,",
          "Jisu Nongpynim nga shem.",
          "U long U Lok ba jai jai ba sngewtngen,",
          "U ai ha nga ka jingkmen,",
          "Jingartatien bad jingdum ki la jah noh,",
          "Jingkmen ka dohnud nga la ïoh.",
          "Jingkmen bad burom Blei ka shlei ha nga,",
          "Ha ka diengphna U pynkhuid phar ïa nga,",
          "Ki pop U sait khuid phar,",
          "Bad jingdum ka shai lut kdar,",
          "Jingkmen bad burom Blei ka shlei ha nga.",
        ],
      },
    ],
  },
  {
    id: "khoros-27",
    title: "Ngi don U Blei ba khraw ba phylla",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 27,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          "Ngi don U Blei ba khraw ba phylla, (2 sien)",
          "U Blei Uba ieit ïa ngi baroh,",
          "Ba leh sbun ïa ngi kumjuh,",
          "U Blei ba khraw ba phylla.",
          "Un ym iehnoh ïa ngi da lei lei ruh,",
          "Na ngi Un ym jngai shuh,",
          "Haba ngi kyllon U ïarap.",
          "Khmat ha ngi ki ïai shon shap.",
        ],
      },
    ],
  },
  {
    id: "khoros-28",
    title: "Їar ïar kat ka duriaw, ka jrong kat ka bneng shatei",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 28,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Їar ïar kat ka duriaw, ka jrong kat ka bneng shatei,`,
          `Jylliew kat ka duriaw bah, ka jingieit bah U Trai`,
          `Ah! Nga la dei ban jot, pynban nga long Khun jong U;`,
          `Namar ka Ktien jong U ka hikai ba U ieit eh ïa nga,`,
        ],
      },
    ],
  },
  {
    isChorus: true,
    id: "khoros-29",
    title: "Naba U Blei U ieit katta ïa ka pyrthei",
    metadata: {
      isChorus: true,
      number: 29,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Naba U Blei U ieit katta ïa ka pyrthei,`,
          `B'U aiti la U Khun, Uba la kha marwei,`,
          `Jar katba ngeit ha U, Un ym lah ban jot shuh!`,
          `Un ïoh jingim bymjukut.`,
        ],
      },
    ],
  },
  {
    id: "khoros-30",
    isChorus: true,
    title: "Ki ong U long ba phylla",
    metadata: {
      isChorus: true,
      number: 30,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Ki ong U long ba phylla,`,
          `Ki ong U long ba phylla;`,
          "`Ka sngi, u bnai bad ki khlur haneng`",
          `Ki ong U long ba phylla.`,
        ],
      },
      {
        id: "verse-2",
        order: 2,
        type: "CHORUS",
        lines: [
          `Nga tip U long ba phylla,`,
          `Nga tip U long ba phylla;`,
          `U ai jingbam bad U ai jingim,`,
          `Nga tip U long ba phylla.`,
        ],
      },
    ],
  },
  {
    id: "khoros-31",
    isChorus: true,
    title: "La ka jur ka jingïaleh, to long shlur, lok",
    metadata: {
      isChorus: true,
      number: 31,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `La ka jur ka jingïaleh, to long shlur, lok,`,
          `Ha jingshitom bad jingeh, to long shlur, lok,`,
          `Pynpaw la ka rong wat kah, la ka waitlam ruh to rah`,
          `Tur thiaw thiaw ba hok kan lah, to long shlur, lok.`,
          `To long shlur, lok, shaniah ha U Blei wat tieng`,
          `To long shlur, lok, la ki atiar shim to kieng;`,
          `Shaphrang shipai sha ka thma, Nongïalam jong phi Un da,`,
          `Ngin sa jop shisha shisha, to long shlur, lok.`,
        ],
      },
    ],
  },
  {
    id: "khoros-32",
    title: "Nga la kut jingmut ban bud ï'U Jisu",
    isChorus: true,
    metadata: {
      isChorus: true,
      number: 32,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Nga la kut jingmut ban bud ï'U Jisu, (3 sien)`,
          `Ngan ym phai dien, ngan ym phai dien.`,
        ],
      },
      {
        id: "verse-2",
        order: 2,
        type: "CHORUS",
        lines: [
          `Kiwei la kim treh nga marwei ngan bud, (3 sien)`,
          `Ngan ym phai dien, ngan ym phai dien.`,
        ],
      },
      {
        id: "verse-3",
        order: 3,
        type: "CHORUS",
        lines: [
          `Pyrthei ngan ïehnoh, ïa diengphna ngan bah, (3 sien)`,
          `Ngan ym phai dien, Ngan ym phai dien.`,
        ],
      },
    ],
  },
  {
    id: "khoros-33",
    title: "Wan Mynsiem Bakhuid nga donkam",
    isChorus: true,
    metadata: {
      number: 33,
      language: "khasi",
      isChorus: true,
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Wan Mynsiem Bakhuid nga donkam,`,
          `Wan Mynsiem Bakhuid nga duwai;`,
          `Wan ha ka bor bad ka burom,`,
          `Wan ha jinglongkhuid jong Me hi.`,
        ],
      },
    ],
  },
  {
    id: "khoros-34",
    title: "Ki jinglong barim nga la iehnoh baroh",
    isChorus: true,
    metadata: {
      number: 34,
      isChorus: true,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          "Ki jinglong barim nga la iehnoh baroh,(3 sien)",
          "Naduh ba la pynim ïa nga.",
        ],
      },
      {
        id: "chorus-1",
        order: 2,
        type: "CHORUS",
        lines: [
          "Nga long jingthaw thymmai,(3 sien)",
          "Naduh ba la pynim ïa nga.",
        ],
      },
      {
        id: "verse-2",
        order: 3,
        type: "CHORUS",
        lines: [
          "Ki kam ba nga ju leh, ngam leh shuh mynta,(3 sien)",
          "Naduh ba la pynim ïa nga.",
        ],
      },
      {
        id: "verse-3",
        order: 4,
        type: "CHORUS",
        lines: [
          "Kiba nga ju ïohi, ngam peit shuh mynta,(3 sien)",
          "Naduh ba la pynim ïa nga.",
        ],
      },
      {
        id: "verse-4",
        order: 5,
        type: "CHORUS",
        lines: [
          "Jaka ba nga ju leit, ngam leit shuh mynta,(3 sien)",
          "Naduh ba la pynim ïa nga.",
        ],
      },
    ],
  },
  {
    id: "khoros-35",
    isChorus: true,
    title: "Kita ba ap khmih ï'U Trai kin pynthymmai bor",
    metadata: {
      number: 35,
      isChorus: true,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Kita ba ap khmih ï'U Trai kin pynthymmai bor,`,
          `Kin her da thapniang kum ki pukni;`,
          `Kin mareh kin ym sngewthait, kin nangïaid kin ym sngew lwait;`,
          `"Hikai, Trai mon jong Me ban leh"`,
        ],
      },
    ],
  },
  {
    id: "khoros-36",
    title: "Don ba ktah ïa nga mynba nga dang duwai",
    metadata: {
      isChorus: true,
      number: 36,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          "Don ba ktah ïa nga mynba nga dang duwai, (3 sien)",
          "Dei ka kti ba pynim jong U Trai.",
        ],
      },
      {
        id: "verse-2",
        order: 2,
        type: "CHORUS",
        lines: [
          "Don ba ktah ïa nga mynba nga dang khot, (3 sien)",
          "Dei ka kti ba pynim jong U Trai.",
        ],
      },
      {
        id: "verse-3",
        order: 3,
        type: "CHORUS",
        lines: [
          "Don ba ktah ïa nga mynba nga dang wad, (3 sien)",
          "Dei ka kti ba pynim jong U Trai.",
        ],
      },
      {
        id: "verse-4",
        order: 4,
        type: "CHORUS",
        lines: [
          "Don ba ktah ïa nga mynba nga dang rwai, (3 sien)",
          "Dei ka kti ba pynim jong U Trai.",
        ],
      },
    ],
  },
  {
    id: "khoros-37",
    isChorus: true,
    title: "Ah! Mynsiem Bakhuid jingkular",
    metadata: {
      number: 37,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          "Ah! Mynsiem Bakhuid jingkular, (3 sien)",
          "To pynbaptis ïa nga;",
          "Pynbaptis ïa nga da ka ding, (3 sien)",
          "Pynkup noh da ka bor;",
          "To pynkup ïa nga da ka bor, (3 sien)",
          "Pynbaptis da ka ding.",
        ],
      },
    ],
  },
  {
    id: "khoros-38",
    isChorus: true,
    title: "Trai, nga kwah ban long u khristan",
    metadata: {
      number: 38,
      isChorus: true,
      language: "khasi",
    },
    paragraphs: [
      {
        id: "verse-1",
        order: 1,
        type: "CHORUS",
        lines: [
          `Trai, nga kwah ban long u khristan,`,
          `Ha ka dohnud, ha ka dohnud,`,
          `Trai, nga kwah ban long u khristan,`,
          `Ha ka dohnud, ha ka dohnud,`,
        ],
      },
      {
        id: "verse-2",
        order: 2,
        type: "CHORUS",
        lines: [
          `Trai, nga kwah ban long kum Jisu,`,
          `Ha ka dohnud, ha ka dohnud,`,
          `Trai, nga kwah ban long kum Jisu,`,
          `Ha ka dohnud, ha ka dohnud,`,
        ],
      },
    ],
  },
];
