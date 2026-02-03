-- Custom SQL migration file, put your code below! --
ALTER TABLE `recipe` ADD FULLTEXT(`recipe_name`, `ingredients`, `instructions`);