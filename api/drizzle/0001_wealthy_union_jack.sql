ALTER TABLE `custom_field` DROP FOREIGN KEY `custom_field_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `instruction` DROP FOREIGN KEY `instruction_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `recipe` DROP FOREIGN KEY `recipe_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `user_email` varchar(255) NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `date_created` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `date_updated` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `custom_field` ADD CONSTRAINT `custom_field_recipe_id_recipe_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `instruction` ADD CONSTRAINT `instruction_recipe_id_recipe_recipe_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_user_id_user_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE no action ON UPDATE no action;