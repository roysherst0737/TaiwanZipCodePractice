DROP TABLE IF EXISTS zip_codes;

CREATE TABLE zip_codes (
	`id` bigint not null AUTO_INCREMENT primary key,
	`zip_code` LONGVARCHAR
);