ALTER TABLE `recipe` ADD `prep_time` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipe` ADD `cook_time` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipe` ADD `servings` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipe` ADD `ingredients` varchar(2000) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipe` ADD `instructions` varchar(2000) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipe` ADD `external_link` varchar(255);