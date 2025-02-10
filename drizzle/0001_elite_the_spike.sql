ALTER TABLE `snippets` RENAME COLUMN "language" TO "description";--> statement-breakpoint
ALTER TABLE `snippets` ADD `category` text NOT NULL;--> statement-breakpoint
ALTER TABLE `snippets` ADD `tags` text DEFAULT '[]';