CREATE TABLE `lines` (
	`id` text PRIMARY KEY NOT NULL,
	`paragraph_id` text,
	`text` text NOT NULL,
	`order` integer NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `paragraphs` (
	`id` text PRIMARY KEY NOT NULL,
	`song_id` text NOT NULL,
	`order` integer NOT NULL,
	`type` text,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `song_metadata` (
	`id` text PRIMARY KEY NOT NULL,
	`number` integer NOT NULL,
	`old_number` integer,
	`language` text NOT NULL,
	`author` text,
	`composer` text,
	`is_chorus` integer DEFAULT false,
	`tags` text,
	`syllables` text,
	`reference` text,
	`tune` text,
	`meter` text,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`track_id` text,
	`metadata_id` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `songs_metadata_id_unique` ON `songs` (`metadata_id`);--> statement-breakpoint
CREATE TABLE `track_metadata` (
	`id` text PRIMARY KEY NOT NULL,
	`supabase_id` text NOT NULL,
	`path` text NOT NULL,
	`file_name` text NOT NULL,
	`full_path` text NOT NULL,
	`download_url` text NOT NULL,
	`mime_type` text NOT NULL,
	`file_size` integer NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` text PRIMARY KEY NOT NULL,
	`metadata_id` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tracks_metadata_id_unique` ON `tracks` (`metadata_id`);