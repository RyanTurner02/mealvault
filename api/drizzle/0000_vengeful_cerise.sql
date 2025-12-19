CREATE TABLE `recipe` (
	`recipe_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`recipe_name` varchar(255) NOT NULL,
	`prep_time` varchar(255) NOT NULL,
	`cook_time` varchar(255) NOT NULL,
	`servings` varchar(255) NOT NULL,
	`ingredients` varchar(2000) NOT NULL,
	`instructions` varchar(2000) NOT NULL,
	`external_link` varchar(255),
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_deleted` datetime,
	CONSTRAINT `recipe_recipe_id` PRIMARY KEY(`recipe_id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`user_name` varchar(255) NOT NULL,
	`user_password` varchar(255) NOT NULL,
	`user_email` varchar(255) NOT NULL DEFAULT '',
	`date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`date_deleted` datetime,
	CONSTRAINT `user_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `user_email` UNIQUE(`user_email`)
);
--> statement-breakpoint
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_user_id_user_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `user_id` ON `recipe` (`user_id`);