-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2026 at 07:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `focus`
--

CREATE TABLE `focus` (
  `focus_id` int(11) NOT NULL,
  `user_focus` varchar(100) NOT NULL,
  `real_time` int(11) NOT NULL,
  `full_time` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `state` varchar(100) NOT NULL,
  `task` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goal_edit`
--

CREATE TABLE `goal_edit` (
  `user_id` varchar(100) NOT NULL,
  `title` varchar(80) NOT NULL,
  `description` varchar(200) NOT NULL,
  `deadLine` date NOT NULL,
  `priority` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `created_it` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quick-notes`
--

CREATE TABLE `quick-notes` (
  `id_note` int(50) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `title` varchar(128) NOT NULL,
  `message` text NOT NULL,
  `pin_message` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id_task` int(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `task` varchar(80) NOT NULL,
  `category` varchar(40) NOT NULL,
  `time` int(10) NOT NULL,
  `priority` varchar(40) NOT NULL,
  `state` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `daily_goal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `focus` enum('development','study','fitness','work','personal','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'personal',
  `week_start` enum('saturday','sunday','monday') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'saturday',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_profile_completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `focus`
--
ALTER TABLE `focus`
  ADD PRIMARY KEY (`focus_id`);

--
-- Indexes for table `goal_edit`
--
ALTER TABLE `goal_edit`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `quick-notes`
--
ALTER TABLE `quick-notes`
  ADD PRIMARY KEY (`id_note`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id_task`),
  ADD KEY `id_task` (`id_task`),
  ADD KEY `id_task_2` (`id_task`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `focus`
--
ALTER TABLE `focus`
  MODIFY `focus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `quick-notes`
--
ALTER TABLE `quick-notes`
  MODIFY `id_note` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id_task` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
