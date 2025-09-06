PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_songs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_songs`("id", "title") SELECT "id", "title" FROM `songs`;--> statement-breakpoint
DROP TABLE `songs`;--> statement-breakpoint
ALTER TABLE `__new_songs` RENAME TO `songs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;