CREATE TABLE `songMetadata` (
	`number` integer NOT NULL,
	`old_number` integer,
	`song_id` text PRIMARY KEY NOT NULL,
	`language` text NOT NULL,
	`author` text,
	`composer` text,
	`created_at` text,
	`tags` text,
	`syllables` text,
	`reference` text,
	`tune` text,
	`meter` text
);
--> statement-breakpoint
CREATE TABLE `songParagraphs` (
	`id` text PRIMARY KEY NOT NULL,
	`song_id` text NOT NULL,
	`order` integer NOT NULL,
	`lines` text NOT NULL,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` text PRIMARY KEY DEFAULT '45691ec6-7a5e-4611-b237-e0d27853b210' NOT NULL,
	`title` text NOT NULL
);
