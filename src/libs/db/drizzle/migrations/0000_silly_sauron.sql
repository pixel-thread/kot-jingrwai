CREATE TABLE `Paragraph` (
	`id` text PRIMARY KEY NOT NULL,
	`order` integer NOT NULL,
	`lines` text,
	`type` text,
	`createdAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`songId` text NOT NULL,
	FOREIGN KEY (`songId`) REFERENCES `Song`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `SongMetadata` (
	`id` text PRIMARY KEY NOT NULL,
	`number` integer NOT NULL,
	`oldNumber` integer,
	`language` text NOT NULL,
	`author` text,
	`composer` text,
	`tags` text,
	`syllables` text,
	`reference` text,
	`tune` text,
	`meter` text,
	`createdAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`songId` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `SongMetadata_songId_unique` ON `SongMetadata` (`songId`);--> statement-breakpoint
CREATE TABLE `Song` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`isChorus` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`trackId` text,
	`metadataId` text NOT NULL,
	FOREIGN KEY (`trackId`) REFERENCES `Track`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`metadataId`) REFERENCES `SongMetadata`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Song_metadataId_unique` ON `Song` (`metadataId`);--> statement-breakpoint
CREATE TABLE `TrackMetadata` (
	`id` text PRIMARY KEY NOT NULL,
	`supabaseId` text NOT NULL,
	`path` text NOT NULL,
	`fileName` text NOT NULL,
	`fullPath` text NOT NULL,
	`downloadUrl` text NOT NULL,
	`mimeType` text NOT NULL,
	`fileSize` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`trackId` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `TrackMetadata_trackId_unique` ON `TrackMetadata` (`trackId`);--> statement-breakpoint
CREATE TABLE `Track` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`metadataId` text NOT NULL,
	FOREIGN KEY (`metadataId`) REFERENCES `TrackMetadata`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Track_metadataId_unique` ON `Track` (`metadataId`);