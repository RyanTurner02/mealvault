CREATE DATABASE IF NOT EXISTS `mealvault`;

USE `mealvault`;

CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_email` VARCHAR(255) UNIQUE,
    `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `date_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `date_deleted` DATETIME DEFAULT NULL
);

CREATE TABLE `recipe` (
    `recipe_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `recipe_name` VARCHAR(255) NOT NULL,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `date_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `date_deleted` DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE `instruction` (
    `instruction_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `recipe_id` INT NOT NULL,
    `instruction_text` TEXT,
    `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `date_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `date_deleted` DATETIME DEFAULT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE `custom_field` (
    `field_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `recipe_id`	INT NOT NULL,
    `field_name` VARCHAR(255),
    `field_type` INT,
    `field_text` TEXT,
    `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `date_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `date_deleted` DATETIME DEFAULT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);
