-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 12, 2022 at 02:07 AM
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
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id_vehicle` int(11) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  `type` varchar(80) NOT NULL,
  `brand` varchar(80) NOT NULL,
  `image` text DEFAULT NULL,
  `capacity` varchar(5) NOT NULL,
  `location` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `payment` int(11) NOT NULL,
  `rent_count` int(11) NOT NULL DEFAULT 0,
  `status` enum('Available','Full Booked') NOT NULL DEFAULT 'Available',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id_vehicle`, `id_category`, `type`, `brand`, `image`, `capacity`, `location`, `price`, `qty`, `payment`, `rent_count`, `status`, `createdAt`, `updatedAt`) VALUES
(7, 1, 'Cars', 'Kijang Innova', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652186383/go-rental/uploads/kijang-innova-1652186382248.jpg', '5', 'Jakarta', 425000, 3, 0, 2, 'Available', '2022-01-26 16:59:59', '2022-05-10 19:39:44'),
(10, 2, 'Motorbike', 'Yamaha Jupiter', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313498/go-rental/uploads/yamaha-jupiter-1652313496528.jpg', '2', 'Bali', 80000, 3, 0, 3, 'Available', '2022-01-27 10:39:59', '2022-05-12 06:58:18'),
(12, 2, 'Motorbike', 'Honda Beat', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313663/go-rental/uploads/honda-beat-1652313662916.jpg', '2', 'Bandung', 90000, 3, 0, 1, 'Available', '2022-01-27 13:06:26', '2022-05-12 07:01:04'),
(13, 3, 'Bike', 'Polygon', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313626/go-rental/uploads/polygon-1652313624327.jpg', '1', 'Bandung', 70000, 2, 0, 2, 'Available', '2022-01-28 10:13:34', '2022-05-12 07:00:26'),
(15, 3, 'Bike', 'Onthel', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652175749/go-rental/uploads/onthel-1652175746690.jpg', '1', 'Yogyakarta', 50000, 3, 0, 1, 'Available', '2022-01-28 10:23:05', '2022-05-10 16:42:30'),
(17, 1, 'Cars', 'Kijang Innova', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652175794/go-rental/uploads/kijang-innova-1652175790221.jpg', '7', 'Bandung', 425000, 3, 0, 1, 'Available', '2022-01-28 10:32:16', '2022-05-10 16:43:15'),
(19, 1, 'Cars', 'Mazda ', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313555/go-rental/uploads/mazda-1652313553637.jpg', '5', 'Yogyakarta', 500000, 2, 0, 14, 'Available', '2022-01-30 17:34:14', '2022-05-12 06:59:15'),
(23, 1, 'Cars', 'Toyota Avanza', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313702/go-rental/uploads/toyota-avanza-1652313700491.jpg', '7', 'Jakarta', 300000, 4, 0, 2, 'Available', '2022-01-30 19:50:51', '2022-05-12 07:01:42'),
(67, 2, 'Motorbike', 'Vespa Matic', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652175956/go-rental/uploads/vespa-matig-1652175952889.jpg', '2', 'Bandung', 110000, 3, 0, 3, 'Available', '2022-02-01 21:07:20', '2022-05-10 16:45:57'),
(69, 2, 'Motorbike', 'Vespa Matic', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652175992/go-rental/uploads/vespa-matig-1652175984740.jpg', '2', 'Yogyakarta', 110000, 2, 0, 2, 'Available', '2022-02-02 05:58:24', '2022-05-10 16:46:33'),
(104, 1, 'Cars', 'Honda Brio', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313784/go-rental/uploads/Honda-Brio-1652313783046.jpg', '5', 'Bali', 250000, 1, 0, 0, 'Available', '2022-02-10 20:11:21', '2022-05-12 07:03:05'),
(106, 1, 'Cars', 'Xenia', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313736/go-rental/uploads/xenia-1652313734780.jpg', '5', 'Bali', 300000, 2, 0, 2, 'Available', '2022-03-01 08:32:10', '2022-05-12 07:02:16'),
(107, 1, 'Cars', 'Honda Brio New', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652313793/go-rental/uploads/Honda-Brio-1652313792384.jpg', '1', 'Yogyakarta', 300000, 1, 0, 0, 'Available', '2022-04-11 07:41:13', '2022-05-12 07:03:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id_vehicle`),
  ADD KEY `id_category` (`id_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id_vehicle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
