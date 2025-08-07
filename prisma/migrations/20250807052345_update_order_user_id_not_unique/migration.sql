-- 1. Drop foreign key tạm thời để có thể sửa index
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_fkey`;

-- 2. Drop UNIQUE INDEX hiện có trên userId
DROP INDEX `orders_userId_key` ON `orders`;

-- 3. Thêm lại foreign key (KHÔNG unique)
ALTER TABLE `orders`
ADD CONSTRAINT `orders_userId_fkey`
FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;