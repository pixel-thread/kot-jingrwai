import { Container, Ternary, Text } from "@repo/ui-native";
import { ScrollView, View } from "react-native";

type PrayerLineT = {
  id: number;
  line: string;
  order: number[];
};

type KiJingUDwaiT = {
  id: string;
  title: string;
  desc: string;
  prayerLines?: PrayerLineT[];
  pTag?: string;
  nTag?: string;
};

const kiJingDuwai: KiJingUDwaiT[] = [
  {
    id: "kiJingDuwai",
    title: "Kiba man ka sngi",
    desc: "Ki khun Khrist kiba bha ki tang shu khie na bathiah ki leh ia ka Dak ka Diengphna, bad ki tyrwa ia la ki dohnud ha u Blei, da ka ba og \"Ko Jisu, Ko Maria, ko Joseph, ng aiti ha phi ia ka dohnud bad ia la mynsiem.\"",
  },
  {
    id: "kaDakKaDiengPhna",
    title: "Ka Dak Ka Diengphna",
    desc: "Ha ka kyrteng u Kpa, bad u Khun bad u Mynsiem Bakhuid Amen.",
  },
  {
    id: "angelUTrai",
    title: "Ka jingduwai Angel u Trai",
    desc: "Ka jingduwai \"Angel\" ka long ka jingkynmaw ieid ia ka jingmaia ka jinglong doh jong u khun u Blei. To duwai ia ka mynstep mynsngi bad janmit.",
    prayerLines: [
      {
        id: 1,
        order: [1],
        line: "U Angel u Trai u la wanlam ka khubor ha ka Maria,",
      },
      {
        id: 2,
        order: [2],
        line: "Bad ka la pun na Mynsiem Bakhuid Khublei",
      },
      {
        id: 3,
        order: [3, 6, 9],
        line: "Khublei, Ko Maria...",
      },
      {
        id: 4,
        order: [4],
        line: "Hakhmih nga long ka shakri u Trai,",
      },
      {
        id: 5,
        order: [5],
        line: "To kan long ha nga katkum ka ktien jong Me",
      },
      {
        id: 6,
        order: [7],
        line: "Bad ka Ktin ka la wan longdoh,",
      },
      {
        id: 7,
        order: [8],
        line: "Bad ka la shong sah bad ngi",
      },
    ],
    nTag: "To duwai na bynta jong ngi, Ko Nongkha Blei Bakhuid",
    pTag: "Ba ngin long ki babit ia ki jingkular u khrist!",
  },
  {
    id: "to ngin iaduwai",
    title: "To Ngin iaduwai",
    desc: "Ko Trai, ngi Kyrpad ia me to theh ia ka jingaiei jong me hapoh ka dohnud jong ngi, ba ma ngi ki ba la tip ia ka jinglongdoh u Khrist u Khun jong Me Na ka Khubor jong u Angel, da ka jingshah shitom bad ka dienphna jong U, Ngin poi sha ka burom ka jingmihpat. Da ujuh u Khrist U Trai jong ngi.",
    pTag: "Amen.",
  },
  {
    id: "ha ka trinity bakhuid",
    title: "Ha ka trinity bakhuid",
    desc: "Ka burom ha u Kpa, bad ha u Khun, bad ha u Mynsiem Bakhuid. Kumba ka la long ha ka mynnyngkong, kumjuh mynta bad barabor, junom. Amen.",
  },
  {
    id: "to shad kmen, ko syiem",
    title: "To shad kmen, ko syiem",
    desc: "Ha ka por Paskha, ha ka jaka \"U Angel u Trai.\" duwai:",
    prayerLines: [
      {
        id: 1,
        order: [1],
        line: "To shad kmen, Ko Siem ka bneng, bad iohi: Alleluia,",
      },
      {
        id: 2,
        order: [2],
        line: "Ia u Khunlung Bakhuid ba la kha na Pha: Alleluia",
      },
      {
        id: 3,
        order: [3],
        line: "U la mihpat ha ka burom na u mawjingtep: Alleluia",
      },
      {
        id: 4,
        order: [4],
        line: "To duwai ha u Blei na bynta jong ngi: Alleluia",
      },
    ],
    nTag: "To shadkmen bad to sngewbha, ko Maria Theisotti. Alleluia,",
    pTag: "Naba u Trai U la mihpat da shisha: Alleuia.",
  },
  {
    id: "to ngin ia duwai 2",
    title: "To ngin iaduwai",
    desc: "A Blei, Uba da ka jingmihpat u Khun jong me, U Trai jong ngi, u Jisu Khrist, Me la sngewbha ban pyndap ia ka pyrthei da ka jingkmen: to ai, ngi kyrpad ia me, ba ngin ioh pdian ia kata ka jingkmen jong ka jingim bymjukut da ka jingiasaid jong ka Maria Theisotti, ka Kmie jong U. Da ujuh u Khrist u Trai jong ngi.",
    prayerLines: [
      {
        id: 1,
        order: [1],
        line: "Ka burom ha u kpa",
      },
    ],
    pTag: "Amen.",
  },
];

export const KiJingUDwaiScreen = () => {
  return (
    <Container>
      <ScrollView className="flex-1 flex-col p-4">
        {kiJingDuwai.map((item) => (
          <View key={item.id} className="flex-1 gap-4 py-3">
            <View>
              <Text size={"3xl"} weight={"bold"} className="text-center uppercase">
                {item.title}
              </Text>
            </View>
            <View>
              <Text className="text-justify" size={"xl"}>
                {item.desc}
              </Text>
            </View>
            {item.prayerLines && item?.prayerLines?.length > 0 && (
              <View className="gap-2">
                {item.prayerLines?.map((item) => (
                  <View key={item.id} className="flex-1 flex-row gap-2">
                    <Ternary
                      condition={item.order.length === 1}
                      ifTrue={
                        <Text className="text-start" size={"xl"}>
                          -
                        </Text>
                      }
                      ifFalse={
                        <Text className="text-start" size={"xl"}>
                          &nbsp;
                        </Text>
                      }
                    />
                    <Text className="text-start" size={"xl"}>
                      {item.line}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <Ternary
              condition={!!item.nTag}
              ifTrue={
                <View className="flex-1 flex-row gap-x-2">
                  <Text weight={"bold"}>N.</Text>
                  <Text className="text-start" italic size={"xl"}>
                    {item.nTag}
                  </Text>
                </View>
              }
              ifFalse={null}
            />
            <Ternary
              condition={!!item.pTag}
              ifTrue={
                <View className="flex-1 flex-row gap-x-2">
                  <Text weight={"bold"}>P.</Text>
                  <Text className="text-start" italic size={"xl"}>
                    {item.pTag}
                  </Text>
                </View>
              }
              ifFalse={null}
            />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};
