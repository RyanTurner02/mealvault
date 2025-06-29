CREATE TABLE `custom_field` (
	`field_id` int AUTO_INCREMENT NOT NULL,
	`recipe_id` int NOT NULL,
	`field_name` varchar(255),
	`field_type` int,
	`field_text` text,
	`date_created` datetime DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime DEFAULT (CURRENT_TIMESTAMP),
	`date_deleted` datetime,
	CONSTRAINT `custom_field_field_id` PRIMARY KEY(`field_id`)
);
--> statement-breakpoint
CREATE TABLE `instruction` (
	`instruction_id` int AUTO_INCREMENT NOT NULL,
	`recipe_id` int NOT NULL,
	`instruction_text` text,
	`date_created` datetime DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` datetime DEFAULT (CURRENT_TIMESTAMP),
	`date_deleted` datetime,
	CONSTRAINT `instruction_instruction_id` PRIMARY KEY(`instruction_id`)
);
--> statement-breakpoint
CREATE TABLE `recipe` (
	`recipe_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`recipe_name` varchar(255) NOT NULL,
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
ALTER TABLE `custom_field` ADD CONSTRAINT `custom_field_recipe_id_recipe_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `instruction` ADD CONSTRAINT `instruction_recipe_id_recipe_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_user_id_user_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `recipe_id` ON `custom_field` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `recipe_id` ON `instruction` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `recipe` (`user_id`);