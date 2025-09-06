PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_songParagraphs` (
	`id` text PRIMARY KEY DEFAULT '7bfc44af-e980-489d-a204-f7ba7a0c7a7d' NOT NULL,
	`song_id` text NOT NULL,
	`order` integer NOT NULL,
	`lines` text NOT NULL,
	`type` text
);
--> statement-breakpoint
INSERT INTO `__new_songParagraphs`("id", "song_id", "order", "lines", "type") SELECT "id", "song_id", "order", "lines", "type" FROM `songParagraphs`;--> statement-breakpoint
DROP TABLE `songParagraphs`;--> statement-breakpoint
ALTER TABLE `__new_songParagraphs` RENAME TO `songParagraphs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_songs` (
	`id` text PRIMARY KEY DEFAULT 'ece8d0c6-cca5-401f-946f-02b87d386122' NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_songs`("id", "title") SELECT "id", "title" FROM `songs`;--> statement-breakpoint
DROP TABLE `songs`;--> statement-breakpoint
ALTER TABLE `__new_songs` RENAME TO `songs`;