CREATE DATABASE IF NOT EXISTS `vue_express`;

use `vue_express`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` VARCHAR(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `reset_token` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `token_expires` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB;