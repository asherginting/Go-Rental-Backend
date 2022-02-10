-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 07, 2022 at 12:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Cars'),
(2, 'Motorbike'),
(3, 'Bike');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `prepayment` int(11) NOT NULL,
  `rent_date` datetime DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `vehicle_id`, `user_id`, `prepayment`, `rent_date`, `return_date`, `createdAt`) VALUES
(1, 2, 1, 0, '2022-02-01 15:38:35', NULL, '2022-02-02 13:12:49'),
(2, 4, 5, 0, '2022-02-01 15:56:22', NULL, '2022-02-02 13:12:49'),
(3, 3, 5, 150000, '2022-02-03 00:00:00', '2022-02-10', '2022-02-02 13:12:49'),
(11, 5, 1, 0, '2022-02-02 01:54:54', NULL, '2022-02-02 13:12:49'),
(12, 2, 32, 0, '2022-02-02 01:56:22', NULL, '2022-02-02 13:12:49'),
(13, 2, 7, 0, '2022-02-02 01:56:41', NULL, '2022-02-02 13:12:49'),
(14, 44, 9, 0, '2022-02-02 01:57:56', NULL, '2022-02-02 13:12:49'),
(15, 2, 6, 0, '2022-02-02 01:58:45', NULL, '2022-02-02 13:12:49'),
(16, 10, 5, 0, '2022-02-02 01:58:55', NULL, '2022-02-02 13:12:49'),
(17, 9, 2, 0, '2022-02-02 02:00:09', NULL, '2022-02-02 13:12:49'),
(18, 44, 6, 0, '2022-02-02 02:01:05', NULL, '2022-02-02 13:12:49'),
(19, 5, 1, 100000, '2022-02-05 00:00:00', '2022-02-07', '2022-02-03 08:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone_number` varchar(13) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_number`, `gender`, `birthdate`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Ginting', 'ginting@gmail.com', 'ginting123', '081234580832', 'Male', '1995-09-06', 'Jln. Beringin', '2022-01-28 10:42:27', '2022-02-06 23:14:19'),
(2, 'Sembiring', 'sembiring@gmail.com', 'sembiring123', '0813567744', 'Male', '1996-09-03', 'Jln. Bunga Mawar', '2022-01-28 10:42:27', '2022-02-06 23:15:32'),
(3, 'Tarigan', 'tarigan@gmail.com', 'tarigan123', '081289664', 'Male', '1996-04-05', 'Jln. Cempaka', '2022-01-28 10:42:27', '2022-02-06 23:17:01'),
(4, 'Perangin-Perangin', 'perangin2@gmail.com', 'perangin2123', '0815266262', 'Male', '2000-09-21', 'Jln. Mawar', '2022-01-28 10:48:57', '2022-02-06 23:18:10'),
(5, 'Karo Karo', 'karo2@gmail.com', 'karo123', '0825626222', 'Male', '1990-05-09', 'Jln. Melati', '2022-01-28 10:51:58', '2022-02-06 23:19:10'),
(6, 'Diana', 'diana@gmail.com', 'diana123', '081267628212', 'Female', '2010-10-06', 'Jln. Cendrawasih', '2022-01-28 10:52:58', '2022-02-07 05:08:10'),
(7, 'Sumarni', 'sumarni@gmail.com', 'sumarni123', '082617772728', 'Female', '1999-07-15', 'Jln. Anggrek', '2022-01-28 10:53:51', '2022-02-07 05:09:59'),
(9, 'Sinta', 'sinta@gmail.com', 'sinta123', '08138983737', 'Female', '2001-06-07', 'Jl. Suprapto', '2022-01-28 14:16:48', '2022-02-07 05:12:15'),
(31, 'Johan', 'johan@gmail.com', 'johan123', '0812736373', 'Male', '2000-07-06', 'Jl. Iskandar Muda', '2022-01-30 14:29:36', '2022-02-07 05:14:05'),
(32, 'Ayu', 'ayu@gmail.com', 'ayu123', '08127363837', 'Female', '2000-07-05', 'Jl. Bukit Cendana No.1', '2022-01-30 14:33:50', '2022-02-07 05:17:16'),
(34, 'Nofia', 'nofia@gmail.com', 'nofia123', '08261562726', 'Female', '2002-06-03', 'Jl. Bukit Cendana No.2', '2022-02-02 07:54:27', '2022-02-07 05:18:45'),
(35, 'Amelia', 'amelia@gmail.com', 'amelia123', '08213738837', 'Female', '1999-04-23', 'Jl. Bukit Cendana No.3', '2022-02-02 08:23:02', '2022-02-07 05:20:05'),
(36, 'Natalia', 'natalia@gmail.com', 'natalia123', '082172828722', 'Female', '1999-04-09', 'Jl. Bukit Cendana No.4', '2022-02-03 22:33:34', '2022-02-07 05:21:04'),
(37, 'Susi', 'susi@gmail.com', 'susi123', '08218474837', 'Female', '2000-04-13', 'Jl. Bukit Cendana No.5', '2022-02-04 07:13:50', '2022-02-07 05:22:13'),
(38, 'Haryati', 'haryati@gmail.com', 'haryati123', '08214847383', 'Female', '1996-04-10', 'Jl. Sukamaju', '2022-02-04 07:15:45', '2022-02-07 05:23:37'),
(39, 'Elis', 'elis@gmail.com', 'elis123', '08262727282', 'Female', '1992-02-13', 'Jl. Bandung Raya', '2022-02-04 07:31:52', '2022-02-07 05:25:20'),
(40, 'Robert', 'robert@gmail.com', 'robert123', '08262773773', 'Male', '1998-04-01', 'Jl. Pembangunan', '2022-02-04 07:38:38', '2022-02-07 05:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `available` tinyint(4) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `seat` int(2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `year`, `cost`, `available`, `type`, `seat`, `category_id`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'Hondat Beat', '2018', 150000, 1, 'Matic', 2, 2, 'Jakarta', '2022-01-26 00:00:00', '2022-02-07 05:35:40'),
(2, 'Honda Scoopy', '2016', 80000, 3, 'Matic', 2, 2, 'Bandung', '2022-01-26 00:00:00', '2022-02-07 05:45:54'),
(3, 'Honda Scoopy', '2021', 120000, 1, 'Matic', 2, 2, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-07 05:49:17'),
(4, 'Jeep', '2017', 500000, 1, 'Manual', 5, 1, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-07 05:50:09'),
(5, 'Suzuki Satria FU 150', '2020', 120000, 3, 'Manual', 2, 2, 'Semarang', '2022-01-26 00:00:00', '2022-02-07 05:45:54'),
(6, 'Toyota Avanza', '2018', 250000, 2, 'Manual', 5, 1, 'Jakarta', '2022-01-26 00:00:00', '2022-02-07 05:56:02'),
(7, 'Toyota Rush', '2020', 250000, 1, 'Manual', 5, 1, 'Batam', '2022-01-26 00:00:00', '2022-02-07 05:51:53'),
(8, 'Kawasaki KLX', '2020', 200000, 1, 'Manual', 2, 2, 'Jakarta', '2022-01-26 00:00:00', '2022-02-07 05:45:54'),
(9, 'Yamaha NMAX', '2021', 220000, 0, 'Matic', 2, 2, 'Surabaya', '2022-01-26 00:00:00', '2022-02-07 05:45:54'),
(10, 'Toyota Avanza', '2012', 250000, 1, 'Manual', 5, 1, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-07 05:28:47'),
(11, 'Toyota Avanza', '2018', 250000, 0, 'Manual', 5, 1, 'Semarang', '2022-01-26 00:00:00', '2022-02-07 05:29:38'),
(36, 'Toyota Avanza', '2016', 220000, 1, 'Matic', 5, 1, 'Jakarta', '2022-01-27 20:42:17', '2022-02-07 05:31:41'),
(38, 'Toyota Avanza', '2016', 250000, 2, 'Manual', 5, 1, 'Yogyakarta', '2022-01-31 00:23:59', '2022-02-07 05:31:41'),
(40, 'Toyota Avanza', '2016', 250000, 3, 'Matic', 5, 1, 'Yogyakarta', '2022-01-31 00:48:05', '2022-02-07 05:31:41'),
(44, 'Honda Mobilio', '2019', 190000, 2, 'Matic', 5, 1, 'Bandung', '2022-01-31 10:11:51', '2022-02-07 05:34:44'),
(45, 'Honda Mobilio', '2019', 200000, 2, 'Manual', 5, 1, 'Bandung', '2022-01-31 10:12:19', '2022-02-07 05:34:44'),
(48, 'Honda Vario', '2019', 200000, 0, 'Matic', 2, 2, 'Bandung', '2022-01-31 13:53:10', '2022-02-07 05:45:54'),
(49, 'Honda Mobilio', '2021', 200000, 1, 'Manual', 5, 1, 'Bandung', '2022-01-31 13:57:24', '2022-02-07 05:34:44'),
(62, 'Yamaha NMAX', '2019', 200000, 2, 'Manual', 2, 2, 'Bandung', '2022-02-02 08:41:00', '2022-02-07 05:45:55'),
(63, 'Toyota Rush', '2019', 250000, 2, 'Manual', 5, 1, 'Jakarta', '2022-02-02 08:42:32', '2022-02-07 05:51:53'),
(64, 'Toyota Rush', '2018', 200000, 2, 'Manual', 5, 1, 'Semarang', '2022-02-02 09:34:44', '2022-02-07 05:51:53'),
(65, 'Polygon Xtrada 5', '2019', 149000, 1, 'Manual', 1, 3, 'Bandung', '2022-02-02 13:16:07', '2022-02-07 05:48:41'),
(66, 'Honda Beat', '2021', 152000, 2, 'Matic', 2, 2, 'Yogyakarta', '2022-02-02 13:18:00', '2022-02-07 05:55:20'),
(67, 'Yamaha Mio Fino', '2019', 155000, 1, 'Matic', 2, 2, 'Jakarta', '2022-02-02 13:20:34', '2022-02-07 05:45:55'),
(68, 'Polygon Xtrada 5', '2020', 189000, 1, 'Manual', 1, 3, 'Jakarta', '2022-02-02 13:22:31', '2022-02-07 05:48:41'),
(69, 'Onthel', '2019', 100000, 2, 'Manual', 1, 3, 'Semarang', '2022-02-02 13:23:27', '2022-02-07 05:48:41'),
(70, 'Yamaha Mio Fino', '2021', 155000, 2, 'Matic', 2, 2, 'Bandung', '2022-02-02 13:24:22', '2022-02-07 05:45:55'),
(71, 'Yamaha Mio Z', '2021', 163000, 1, 'Matic', 2, 2, 'Semarang', '2022-02-02 13:25:31', '2022-02-07 05:45:55'),
(72, 'Yamaha Mio Z', '2020', 179000, 2, 'Matig', 2, 2, 'Jakarta', '2022-02-02 13:27:02', '2022-02-07 05:45:55'),
(73, 'Yamaha Mio Z', '2021', 157000, 2, 'Matic', 2, 2, 'Batam', '2022-02-02 13:27:52', '2022-02-07 05:54:52'),
(74, 'BMW ', '2020', 499000, 1, 'Manual', 5, 1, 'Jakarta', '2022-02-02 13:30:21', '2022-02-07 05:55:42'),
(75, 'Honda Mobilio', '2019', 190000, 2, 'Matic', 5, 1, 'Bandung', '2022-02-02 13:32:09', '2022-02-07 05:34:44'),
(85, 'Honda Mobilio', '2019', 190000, 2, 'Manual', 0, 1, 'Kalimantan', '2022-02-03 19:02:08', '2022-02-07 05:34:44'),
(87, 'Honda Scoopy', '2019', 200000, 2, 'Matig', 5, 2, 'Jakarta', '2022-02-03 19:14:51', '2022-02-07 05:58:42'),
(88, 'Honda Beat', '2019', 200000, 2, 'Matig', 5, 2, 'Batam', '2022-02-03 19:26:13', '2022-02-07 05:58:42'),
(89, 'Daihatsu Terios', '2019', 220000, 1, 'Manual', 5, 1, 'Jakarta', '2022-02-03 21:39:26', '2022-02-07 05:56:41'),
(90, 'Polygon Xtrada 5', '2019', 189000, 1, 'Manual', 1, 3, 'Semarang', '2022-02-03 21:43:46', '2022-02-07 05:48:41'),
(91, 'Mercedes Benz', '2021', 369900, 1, 'Manual', 5, 1, 'Jakarta', '2022-02-03 21:50:11', '2022-02-07 05:54:00'),
(92, 'Mercedes Benz', '2020', 365000, 1, 'Manual', 5, 1, 'South Jakarta', '2022-02-03 22:04:52', '2022-02-07 05:54:00'),
(93, 'Mercedes Benz', '2020', 369000, 1, 'Manual', 5, 1, 'Jakarta', '2022-02-04 08:45:56', '2022-02-07 05:54:00'),
(94, 'Toyota Alphard', '2019', 250000, 3, 'Matic', 4, 1, 'Batam', '2022-02-06 23:29:03', '2022-02-06 17:26:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
