import React, { useState, useEffect } from 'react';
import { KhorusContext } from '~/src/context/khorus';
import { KhorusContextT } from '~/src/types/khorus';
import { db } from '~/src/db/drizzle';
import { songTable, songMetadataTable, songParagraphTable } from '~/src/db/drizzle/schema';
import { eq } from 'drizzle-orm';
import { SongParagraphType, SongT } from '~/src/types/song';

type KhorusProviderProps = {
  children: React.ReactNode;
};

export const KhorusProvider = ({ children }: KhorusProviderProps) => {
  const [khorusList, setKhorusList] = useState<SongT[]>([]);
  const [khorusIndex, setKhorusIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // Fetch songs with isChorus = 1 (Khorus)
      const khorusRows = await db
        .select({
          id: songTable.id,
          title: songTable.title,
          metadata_number: songMetadataTable.number,
          metadata_language: songMetadataTable.language,
          metadata_author: songMetadataTable.author,
          metadata_composer: songMetadataTable.composer,
          metadata_createdAt: songMetadataTable.createdAt,
          metadata_tags: songMetadataTable.tags,
          metadata_oldNumber: songMetadataTable.oldNumber,
          metadata_syllables: songMetadataTable.syllables,
          metadata_reference: songMetadataTable.reference,
          metadata_tune: songMetadataTable.tune,
          metadata_meter: songMetadataTable.meter,
          isChorus: songTable.isChorus,
        })
        .from(songTable)
        .innerJoin(songMetadataTable, eq(songMetadataTable.songId, songTable.id))
        .orderBy(songMetadataTable.number)
        .where(eq(songTable.isChorus, 1)); // filter for choruses

      // Fetch paragraphs per khorus
      const fullKhorusList: SongT[] = [];
      for (const row of khorusRows) {
        const paragraphsRows = await db
          .select({
            id: songParagraphTable.id,
            songId: songParagraphTable.songId,
            order: songParagraphTable.order,
            lines: songParagraphTable.lines,
            type: songParagraphTable.type,
          })
          .from(songParagraphTable)
          .where(eq(songParagraphTable.songId, row.id))
          .orderBy(songParagraphTable.order);

        fullKhorusList.push({
          id: row.id,
          title: row.title,
          isChorus: row.isChorus || undefined,
          metadata: {
            number: row.metadata_number,
            oldNumber: row.metadata_oldNumber || undefined,
            language: row.metadata_language,
            author: row.metadata_author || undefined,
            composer: row.metadata_composer || undefined,
            createdAt: row.metadata_createdAt || undefined,
            tags: row.metadata_tags ? JSON.parse(row.metadata_tags) : undefined,
            syllables: row.metadata_syllables || undefined,
            reference: row.metadata_reference || undefined,
            tune: row.metadata_tune || undefined,
            meter: row.metadata_meter || undefined,
            songId: row.id,
          },
          paragraphs: paragraphsRows.map((p) => ({
            id: p.id,
            order: p.order,
            lines: JSON.parse(p.lines),
            type: (p.type as SongParagraphType) || undefined,
            songId: p.songId,
          })),
        });
      }

      setKhorusList(fullKhorusList);
      setLoading(false);
    })();
  }, []);

  const currentKhorus = khorusList[khorusIndex] || null;
  const isNotFound = !currentKhorus;
  const isLastKhorus = khorusIndex === khorusList.length - 1;

  const ChangeKhorus = (khorusNo: number) => {
    const index = khorusList.findIndex((khorus) => khorus.metadata.number === khorusNo);
    if (index !== -1) {
      setKhorusIndex(index);
    }
  };

  const onNextKhorus = () => {
    if (khorusIndex < khorusList.length - 1) {
      setKhorusIndex((prev) => prev + 1);
    }
  };

  const onPreviousKhorus = () => {
    if (khorusIndex > 0) {
      setKhorusIndex((prev) => prev - 1);
    }
  };

  const value: KhorusContextT = {
    khorus: currentKhorus,
    ChangeKhorus,
    currentKhorusIndex: khorusIndex,
    isLastKhorus,
    isNotFound,
    onNextKhorus,
    onPreviousKhorus,
  };

  if (loading) {
    return null; // or loading indicator
  }

  return <KhorusContext.Provider value={value}>{children}</KhorusContext.Provider>;
};
