PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_songs` (
	`id` text PRIMARY KEY DEFAULT 'b2ba8710-e10d-4194-bbc0-b5db918de155' NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_songs`("id", "title") SELECT "id", "title" FROM `songs`;--> statement-breakpoint
DROP TABLE `songs`;--> statement-breakpoint
ALTER TABLE `__new_songs` RENAME TO `songs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;