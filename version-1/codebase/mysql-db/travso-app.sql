-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 02:25 PM
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
-- Database: `travso-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `bkt_lists`
--

CREATE TABLE `bkt_lists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `list_name` varchar(255) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `block_user`
--

CREATE TABLE `block_user` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `blocked_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `block_user`
--

INSERT INTO `block_user` (`id`, `user_id`, `blocked_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2024-12-12 10:48:26', '2024-12-12 10:48:26'),
(2, 27, 13, '2024-12-12 11:58:08', '2024-12-12 11:58:08'),
(3, 27, 9, '2024-12-15 11:12:35', '2024-12-15 11:12:35'),
(4, 27, 9, '2024-12-15 11:12:39', '2024-12-15 11:12:39');

-- --------------------------------------------------------

--
-- Table structure for table `bucket_list`
--

CREATE TABLE `bucket_list` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bucket_list`
--

INSERT INTO `bucket_list` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(1, 1, 26, '2024-11-26 06:39:04'),
(2, 4, 26, '2024-11-26 06:39:04');

-- --------------------------------------------------------

--
-- Table structure for table `buddies`
--

CREATE TABLE `buddies` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `buddies_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buddies`
--

INSERT INTO `buddies` (`id`, `user_id`, `buddies_id`, `created_at`) VALUES
(31, 27, 13, '2024-12-13 05:15:31'),
(32, 13, 27, '2024-12-13 05:15:31'),
(33, 27, 11, '2024-12-18 05:18:01'),
(34, 27, 19, '2024-12-18 11:51:07'),
(35, 27, 23, '2024-12-18 11:51:50'),
(40, 27, 50, '2024-12-18 12:00:28'),
(41, 27, 50, '2024-12-18 12:01:21'),
(42, 27, 50, '2024-12-18 12:01:25'),
(43, 50, 27, '2024-12-18 12:01:31');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
(1, 1, 13, 'Nice.', '2024-11-25 07:27:15'),
(2, 1, 26, 'Wounderfull', '2024-11-25 07:27:15'),
(4, 4, 11, 'Where are you?', '2024-11-26 07:46:22'),
(8, 4, 27, 'dsdhjh', '2024-11-27 11:37:35'),
(12, 1, 27, 'dhsdjhjhj', '2024-11-27 12:12:14'),
(14, 1, 27, 'hello', '2024-11-28 10:58:59'),
(15, 4, 27, 'hello', '2024-11-28 12:17:09'),
(16, 4, 27, 'second time hello', '2024-11-28 12:18:49'),
(17, 4, 27, '😅', '2024-11-28 12:29:26'),
(18, 4, 27, 'hello bhai kya haalchaal😀', '2024-11-28 12:30:23'),
(19, 1, 27, '😂', '2024-11-28 12:56:11'),
(20, 4, 27, 'testing comment', '2024-11-28 13:30:58'),
(21, 4, 27, 'rishabh thank you bhaiya', '2024-11-28 13:33:42'),
(22, 1, 27, 'hello', '2024-11-29 06:03:27'),
(23, 1, 27, 'hii', '2024-11-29 06:05:02'),
(24, 1, 27, 'test comment 15', '2024-11-29 06:05:43'),
(25, 4, 27, 'hello', '2024-11-29 06:17:34'),
(26, 4, 27, 'kkk', '2024-11-29 06:18:20'),
(27, 4, 27, 'hello', '2024-11-29 06:18:27'),
(28, 1, 27, 'new comment', '2024-11-29 09:52:31'),
(29, 1, 27, 'test again', '2024-11-29 09:55:33'),
(30, 1, 27, 'nikhil testing', '2024-11-29 09:57:04'),
(31, 1, 27, 'hello', '2024-12-02 14:09:14'),
(32, 1, 27, '🙃', '2024-12-02 14:15:36'),
(33, 5, 27, 'hello', '2024-12-02 17:26:02'),
(34, 1, 27, 'hello', '2024-12-02 17:54:57'),
(35, 1, 27, 'final comment on button click', '2024-12-02 17:59:35'),
(36, 1, 27, 'without button', '2024-12-02 17:59:43'),
(37, 1, 27, '😀', '2024-12-02 18:55:48'),
(38, 1, 27, 'k22', '2024-12-03 08:35:54'),
(39, 1, 27, 'test comment 3', '2024-12-03 10:34:27'),
(40, 9, 27, 'hello', '2024-12-03 13:52:54'),
(41, 8, 27, 'hello', '2024-12-03 17:24:31'),
(42, 8, 27, 'how are you', '2024-12-03 17:24:40'),
(43, 1, 27, '😁', '2024-12-04 05:38:52'),
(44, 1, 27, 'hii', '2024-12-04 06:00:01'),
(45, 1, 13, 'Hii buddy', '2024-12-04 06:04:12'),
(46, 1, 27, 'Hello buddy', '2024-12-04 06:59:42'),
(47, 1, 27, 'hello buddy 2', '2024-12-04 07:01:19'),
(48, 8, 27, '🙋', '2024-12-04 10:42:30'),
(49, 9, 27, '🤪', '2024-12-04 11:54:54'),
(50, 4, 27, 'hii', '2024-12-04 12:01:37'),
(52, 9, 27, 'hello bhai', '2024-12-05 12:43:13'),
(53, 9, 27, 'hello bbai 2', '2024-12-05 12:44:17'),
(54, 9, 27, 'hello bhai 3', '2024-12-05 12:44:44'),
(58, 9, 27, 'hello', '2024-12-07 12:05:27'),
(61, 14, 27, 'hello', '2024-12-09 12:40:04'),
(62, 14, 27, 'Hello 5', '2024-12-10 06:13:39'),
(63, 14, 27, '@krishna hello', '2024-12-10 08:47:28'),
(64, 14, 27, '@Nikhil hello bhai', '2024-12-10 08:50:30'),
(66, 14, 27, 'nikhil bhai hello', '2024-12-10 09:55:55'),
(67, 15, 27, 'comment 1', '2024-12-14 05:06:16'),
(68, 1, 27, 'comment from community', '2024-12-14 06:42:08'),
(70, 17, 27, 'hello', '2024-12-18 05:28:55'),
(71, 1, 27, 'new comment', '2024-12-18 05:57:04'),
(72, 1, 27, 'new comment added', '2024-12-18 06:40:59'),
(73, 8, 27, 'hello everyone', '2024-12-18 06:45:17'),
(74, 7, 27, 'first comment', '2024-12-18 06:47:50'),
(75, 7, 27, 'second comment', '2024-12-18 06:50:47'),
(76, 7, 27, 'third comment', '2024-12-18 06:57:05'),
(77, 1, 50, 'comment from tendulkar', '2024-12-18 11:23:46'),
(78, 1, 50, 'new comment from tendulkar', '2024-12-18 11:37:31');

-- --------------------------------------------------------

--
-- Table structure for table `comments_like`
--

CREATE TABLE `comments_like` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments_like`
--

INSERT INTO `comments_like` (`id`, `comment_id`, `user_id`, `created_at`) VALUES
(5, 1, 44, '2024-12-02 12:28:06'),
(8, 1, 27, '2024-12-02 17:41:24'),
(13, 2, 27, '2024-12-03 10:26:48'),
(23, 45, 27, '2024-12-04 07:00:58'),
(24, 5, 27, '2024-12-05 06:04:05'),
(30, 61, 27, '2024-12-10 06:11:47'),
(31, 62, 27, '2024-12-10 06:13:42'),
(32, 78, 50, '2024-12-18 11:37:37');

-- --------------------------------------------------------

--
-- Table structure for table `comment_reply`
--

CREATE TABLE `comment_reply` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_reply`
--

INSERT INTO `comment_reply` (`id`, `comment_id`, `user_id`, `content`, `created_at`) VALUES
(14, 45, 27, 'hello rishabh', '2024-12-04 06:07:44'),
(15, 42, 27, '😆', '2024-12-04 10:53:35'),
(16, 42, 27, '😄', '2024-12-04 11:17:00'),
(19, 40, 27, '🦍', '2024-12-04 11:43:59'),
(20, 40, 27, '🥲', '2024-12-04 11:57:03'),
(24, 42, 27, 'first reply', '2024-12-05 11:48:44'),
(25, 1, 27, 'hello rishbh 1', '2024-12-05 11:49:48'),
(26, 1, 27, 'hello rishabh 2', '2024-12-05 11:49:55'),
(27, 1, 27, 'hello rishabh 3', '2024-12-05 11:50:01'),
(28, 1, 27, 'hello rishabh 4', '2024-12-05 11:50:11'),
(30, 49, 27, 'hello', '2024-12-09 10:02:49'),
(31, 40, 27, '😄', '2024-12-09 12:23:39'),
(32, 61, 27, 'hello2', '2024-12-09 12:40:12'),
(33, 61, 27, '😆', '2024-12-09 12:40:43'),
(34, 61, 27, 'hello 3', '2024-12-10 06:12:49'),
(35, 61, 27, '@Nikhil replied', '2024-12-10 08:51:14'),
(36, 61, 27, 'hii', '2024-12-10 08:53:33'),
(37, 78, 27, 'hello tendulkar', '2024-12-18 11:38:06'),
(38, 78, 27, '2nd tendulkar', '2024-12-18 11:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `followee_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `follower_id`, `followee_id`, `created_at`) VALUES
(625, 13, 27, '2024-12-13 05:14:58'),
(633, 9, 27, '2024-12-15 13:17:32'),
(634, 27, 9, '2024-12-16 05:00:24'),
(635, 11, 27, '2024-12-18 05:16:54'),
(636, 27, 11, '2024-12-18 05:18:01'),
(638, 19, 27, '2024-12-18 10:37:56'),
(639, 27, 13, '2024-12-18 10:39:31'),
(642, 27, 19, '2024-12-18 11:51:07'),
(643, 23, 27, '2024-12-18 11:51:19'),
(644, 27, 23, '2024-12-18 11:51:50'),
(645, 27, 50, '2024-12-18 12:00:28'),
(646, 50, 27, '2024-12-18 12:01:31'),
(647, 26, 27, '2024-12-18 13:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(1, 1, 26, '2024-11-25 07:13:42'),
(2, 1, 13, '2024-11-25 07:13:42'),
(3, 1, 19, '2024-11-25 07:14:05'),
(5, 4, 28, '2024-11-26 05:15:51'),
(99, 14, 27, '2024-12-13 11:00:05'),
(104, 12, 27, '2024-12-14 08:27:18'),
(107, 6, 27, '2024-12-16 08:22:43'),
(110, 9, 27, '2024-12-18 05:10:29'),
(111, 4, 27, '2024-12-18 05:10:33'),
(113, 7, 27, '2024-12-18 06:57:10'),
(122, 1, 27, '2024-12-18 11:30:51'),
(135, 16, 27, '2024-12-18 11:36:18'),
(137, 1, 50, '2024-12-18 11:37:22'),
(140, 5, 27, '2024-12-18 11:48:24');

-- --------------------------------------------------------

--
-- Table structure for table `list_posts`
--

CREATE TABLE `list_posts` (
  `id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `saved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `description` text DEFAULT NULL,
  `buddies_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`buddies_id`)),
  `tag_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tag_id`)),
  `location` varchar(255) DEFAULT NULL,
  `media_url` longtext NOT NULL DEFAULT '[]',
  `status` enum('active','inactive','deleted') DEFAULT 'active',
  `block_post` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `is_public`, `description`, `buddies_id`, `tag_id`, `location`, `media_url`, `status`, `block_post`, `created_at`, `updated_at`) VALUES
(1, 27, 1, 'An application designed and developed to serve the purpose of traveling, like planning, booking, and managing is a travel app. An application has various other features, such as saving all the travel-related information and managing travel apps.', '2', '[\"#posttag\",\"#testtag\"]', 'Indore', '[\"https://images.unsplash.com/photo-1521575107034-e0fa0b594529?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvc3R8ZW58MHx8MHx8fDA%3D\",\"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\"]', 'active', 0, '2024-11-25 06:29:48', '2024-12-13 09:48:33'),
(2, 13, 1, 'Post description 2', '1', '[]', 'Pune', '[\"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\"]', 'inactive', 0, '2024-11-25 06:29:48', '2024-12-16 08:46:25'),
(3, 27, 1, 'Post description 3', '1', '[]', 'Bhopal', '[\"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg\"]', 'deleted', 1, '2024-11-25 06:29:48', '2024-12-13 09:48:49'),
(4, 27, 1, 'Post description 4', '3', '[]', 'Mumbai', '[\"https://image-processor-storage.s3.us-west-2.amazonaws.com/images/866759932dc5358cee86f6552d1250f2/inside-bubble-spheres.jpg\"]', 'active', 1, '2024-11-25 06:29:48', '2024-12-13 09:48:57'),
(5, 27, 0, 'Post description 5', '1', '[]', 'Goa', '[\"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg\"]', 'active', 0, '2024-11-25 06:29:48', '2024-12-13 09:49:12'),
(6, 27, 1, 'My First Post', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:19:58', '2024-12-03 13:19:58'),
(7, 27, 1, 'Second Post😀', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:28:55', '2024-12-03 13:28:55'),
(8, 27, 1, 'Third Post', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:40:10', '2024-12-03 13:40:10'),
(9, 27, 1, 'Fourth Post', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:41:14', '2024-12-03 13:41:14'),
(10, 27, 1, 'This is first test comment', '[19,23]', '[\"#travel\",\"#posttag\"]', NULL, '[]', 'active', 0, '2024-12-07 11:04:26', '2024-12-07 11:05:21'),
(11, 27, 1, 'Test Post for images', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1733721996316.webp\"]', 'active', 0, '2024-12-09 05:26:36', '2024-12-09 05:26:36'),
(12, 27, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', '[19]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1733722360997.webp\",\"http://localhost:3000/uploads/post_img/post_1733722361000.jpeg\"]', 'active', 0, '2024-12-09 05:32:41', '2024-12-09 08:50:42'),
(13, 27, 1, 'Uploading Post from Profile Section', '[23]', '[\"#travelprofile\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1733746079858.webp\",\"http://localhost:3000/uploads/post_img/post_1733746079870.webp\"]', 'active', 0, '2024-12-09 12:07:59', '2024-12-09 12:07:59'),
(14, 27, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '[19]', '[\"#traveltest\"]', 'Nashik', '[\"http://localhost:3000/uploads/post_img/post_1733747951307.jpeg\",\"http://localhost:3000/uploads/post_img/post_1733747951309.jpeg\"]', 'active', 0, '2024-12-09 12:39:11', '2024-12-13 09:50:00'),
(15, 27, 1, 'test story for location', '[13]', '[]', 'Rameshwaram', '[]', 'active', 0, '2024-12-13 09:45:21', '2024-12-13 09:45:21'),
(16, 27, 1, 'Travel is the act of moving from one place to another, often for leisure, work, or to visit family and friends. It can involve short stays between movements, such as tourism. ', '[13]', '[]', NULL, '[]', 'active', 0, '2024-12-13 11:26:09', '2024-12-13 11:26:09'),
(17, 27, 1, 'Travel is the movement of people between distant geographical locations. Travel can be done by foot, bicycle, automobile, train, boat, bus, airplane, ship or other means, with or without luggage, and can be one way or round trip.', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1734091243065.webp\",\"http://localhost:3000/uploads/post_img/post_1734091243074.webp\",\"http://localhost:3000/uploads/post_img/post_1734091243076.jpeg\"]', 'active', 0, '2024-12-13 12:00:43', '2024-12-13 12:00:43'),
(18, 50, 1, 'First post from tendulkar', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1734522101217.jpeg\"]', 'active', 0, '2024-12-18 11:41:41', '2024-12-18 11:41:41');

-- --------------------------------------------------------

--
-- Table structure for table `recent_search`
--

CREATE TABLE `recent_search` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `searched_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recent_search`
--

INSERT INTO `recent_search` (`id`, `user_id`, `searched_id`, `created_at`, `updated_at`) VALUES
(1, 42, 27, '2024-11-30 10:14:58', '2024-11-30 10:14:58');

-- --------------------------------------------------------

--
-- Table structure for table `reply_comment`
--

CREATE TABLE `reply_comment` (
  `id` int(11) NOT NULL,
  `reply_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reply_comment`
--

INSERT INTO `reply_comment` (`id`, `reply_id`, `user_id`, `content`) VALUES
(1, 19, 13, 'reply of reply- kuch nahi'),
(4, 19, 23, 'This is my reply'),
(5, 6, 3, 'This is my replyss'),
(7, 6, 3, 'This is my 3 reply'),
(8, 7, 3, 'Reply ka reply');

-- --------------------------------------------------------

--
-- Table structure for table `reply_like`
--

CREATE TABLE `reply_like` (
  `id` int(11) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reply_like`
--

INSERT INTO `reply_like` (`id`, `reply_id`, `user_id`, `created_at`) VALUES
(1, 6, 3, '2024-12-06 09:47:29'),
(15, 38, 27, '2024-12-18 11:38:35');

-- --------------------------------------------------------

--
-- Table structure for table `shared_post`
--

CREATE TABLE `shared_post` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shared_to_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shared_to_id`)),
  `thoughts` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `shared_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shared_post`
--

INSERT INTO `shared_post` (`id`, `post_id`, `user_id`, `shared_to_id`, `thoughts`, `link`, `shared_at`) VALUES
(1, 1, 26, '', NULL, NULL, '2024-11-26 06:23:29'),
(2, 1, 13, '', NULL, NULL, '2024-11-26 06:24:46'),
(3, 4, 28, '', NULL, NULL, '2024-11-26 06:24:46'),
(4, 14, 27, '[1,2,3,6,7,8]', '', NULL, '2024-12-10 08:01:20'),
(5, 14, 27, '[19,23]', 'hello first thought with nikhil and krishna', NULL, '2024-12-10 08:13:06'),
(6, 14, 27, '[19,23]', 'Second thought', NULL, '2024-12-10 08:14:58'),
(7, 14, 27, '[23]', 'share with nikhil', NULL, '2024-12-10 08:26:21'),
(8, 14, 27, '[23]', 'hello from comment section', NULL, '2024-12-10 09:54:33'),
(9, 14, 27, '[19,23]', 'share from comment section 2', NULL, '2024-12-10 09:55:13'),
(10, 15, 27, '[13]', '', NULL, '2024-12-13 11:08:23'),
(11, 16, 27, '[13]', '', 'http://localhost:5173/Krishna005/16', '2024-12-13 11:40:47'),
(12, 15, 27, '[13]', '', 'http://localhost:5173/undefined/15', '2024-12-14 05:06:25'),
(13, 15, 27, '[13]', '', 'http://localhost:5173/undefined/15', '2024-12-14 05:06:40');

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `media_url` longtext DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `tag` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tag`)),
  `view` enum('Public','Buddies','Followers','') NOT NULL,
  `story_text` varchar(255) DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `user_id`, `media_url`, `caption`, `tag`, `view`, `story_text`, `expires_at`, `created_at`) VALUES
(1, 9, '[\"http://localhost:3000/uploads/post_img/post_1733721996316.webp\"]', NULL, '[27]', 'Public', NULL, '2024-12-15 15:34:58', '2024-12-15 06:39:12'),
(2, 13, '[\"http://localhost:3000/uploads/post_img/post_1733722361000.jpeg\"]', NULL, '[27]', 'Public', NULL, '2024-12-15 07:41:02', '2024-12-15 17:40:35'),
(6, 9, '[\"http://localhost:3000/uploads/post_img/post_1733721996316.webp\"]', NULL, '[27]', 'Public', NULL, '2024-12-19 15:34:58', '2024-12-18 06:39:12'),
(7, 13, '[\"http://localhost:3000/uploads/story_img/story_1734506949916.jpeg_27_Krishna005\"]', NULL, '[27]', 'Public', NULL, '2024-12-18 07:59:52', '2024-12-18 06:39:12'),
(9, 13, '[\"http://localhost:3000/uploads/story_img/story_1734506949916.jpeg_27_Krishna005\"]', NULL, '[]', 'Public', '\"\"', '2024-12-18 19:29:09', '2024-12-18 07:29:09'),
(13, 27, '[\"http://localhost:3000/uploads/story_img/story_1734520324502.jpeg_27_Krishna005\"]', NULL, '[]', 'Public', '\"\"', '2024-12-18 23:12:04', '2024-12-18 11:12:04'),
(14, 50, '[\"http://localhost:3000/uploads/story_img/story_1734520910931.jpeg_50_nik-07\"]', NULL, '[]', 'Public', '\"\"', '2024-12-18 23:21:50', '2024-12-18 11:21:50');

-- --------------------------------------------------------

--
-- Table structure for table `story_likes`
--

CREATE TABLE `story_likes` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_likes`
--

INSERT INTO `story_likes` (`id`, `story_id`, `user_id`, `created_at`) VALUES
(1, 4, 1, '2024-12-16 10:33:22'),
(5, 1, 27, '2024-12-16 11:36:26'),
(6, 2, 27, '2024-12-16 11:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `story_replies`
--

CREATE TABLE `story_replies` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reply_text` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_replies`
--

INSERT INTO `story_replies` (`id`, `story_id`, `user_id`, `reply_text`, `created_at`) VALUES
(1, 3, 3, 'This is a reply to the story.', '2024-12-16 11:27:00'),
(2, 2, 27, 'hello 1st reply to story', '2024-12-16 11:40:03');

-- --------------------------------------------------------

--
-- Table structure for table `story_shares`
--

CREATE TABLE `story_shares` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `thoughts` varchar(255) DEFAULT NULL,
  `shared_to_id` longtext NOT NULL,
  `link` varchar(255) NOT NULL,
  `shared_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_shares`
--

INSERT INTO `story_shares` (`id`, `story_id`, `user_id`, `thoughts`, `shared_to_id`, `link`, `shared_at`) VALUES
(1, 14, 27, NULL, '[]', '', '2024-12-18 17:55:45'),
(2, 14, 27, NULL, '[]', '', '2024-12-18 18:00:50');

-- --------------------------------------------------------

--
-- Table structure for table `story_views`
--

CREATE TABLE `story_views` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `viewed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_views`
--

INSERT INTO `story_views` (`id`, `story_id`, `user_id`, `viewed_at`) VALUES
(5, 2, 27, '2024-12-18 12:08:24'),
(6, 6, 27, '2024-12-18 15:56:39'),
(7, 9, 27, '2024-12-18 15:56:55'),
(8, 11, 27, '2024-12-18 15:57:54'),
(9, 9, 50, '2024-12-18 16:50:57'),
(10, 13, 50, '2024-12-18 16:51:05'),
(11, 14, 27, '2024-12-18 16:52:33'),
(12, 6, 50, '2024-12-18 16:53:11');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(2, '#love_travel'),
(4, '#nature_love'),
(3, '#new_post'),
(1, '#travso');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `isOtpVerified` tinyint(1) NOT NULL DEFAULT 0,
  `is_influencer` tinyint(1) NOT NULL DEFAULT 0,
  `user_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `smlink1` longtext DEFAULT NULL,
  `smlink2` longtext DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_logged_in` tinyint(1) NOT NULL DEFAULT 0,
  `is_follow_selected` tinyint(1) NOT NULL DEFAULT 0,
  `is_online` tinyint(1) NOT NULL DEFAULT 1,
  `badge` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `first_name`, `last_name`, `gender`, `dob`, `state`, `city`, `email`, `mobile_number`, `otp`, `isOtpVerified`, `is_influencer`, `user_name`, `description`, `password`, `is_active`, `user_type`, `smlink1`, `smlink2`, `profile_image`, `cover_image`, `created_at`, `is_logged_in`, `is_follow_selected`, `is_online`, `badge`) VALUES
(9, 'krishna', NULL, NULL, 'male', '1990-11-15', 'Madhya Pradesh', 'Indore', 'kk14@kk.com', '1234567892', '7619', 1, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(11, 'Krishna', NULL, NULL, 'male', '2024-11-01', 'Madhya Pradesh', 'Indore', 'krishnakant0795@gmail.com', '9977195275', '8884', 0, 0, 'Krishna002', 'Test Account Description', '$2b$10$OW4ZCAzq3XiY2n/Yb1TSBu1zY1EOyO.yiUIHkMzpu.xC3b0LLhqiC', 1, 'traveler', 'https://www.instagram.com/krishnakant7947/profilecard/?igsh=MXhieDRyZjhmdHhpZQ==', NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(13, 'Rishabh', NULL, NULL, 'male', '2024-11-01', 'Madhya Pradesh', 'Indore', 'rishabh@rishabh.com', '8720096457', '3198', 0, 0, 'rishabh-07', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ', NULL, 1, NULL, NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1732948983049.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733745929342.webp', '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(19, 'krishna', NULL, NULL, 'male', '1995-03-07', 'Madhya Pradesh', 'Indore', 'kk19@kk.com', '9977194285', '1466', 0, 0, 'Krish003', NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(23, 'Nikhil', NULL, NULL, 'male', '2007-02-25', 'Madhya Pradesh', 'Indore', 'kktest@kk.com', '1212121212', '3725', 0, 0, NULL, NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(26, 'Nikhil Sir', NULL, NULL, 'male', '2006-02-26', 'Madhya Pradesh', 'Indore', 'nikhil02.1998@gmail.com', '7415872603', '0640', 0, 0, 'nikhil-02', NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(27, 'Krishna Kant Malviya', 'Krishna Kant', 'Malviya', 'male', '2006-02-08', 'Madhya Pradesh', 'Indore', 'learncoding299@gmail.com', '9755895314', '0325', 0, 0, 'Krishna005', 'Test Description 004', '$2b$10$OW4ZCAzq3XiY2n/Yb1TSBu1zY1EOyO.yiUIHkMzpu.xC3b0LLhqiC', 1, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733739127944.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733745929342.webp', '2024-11-26 11:37:50', 0, 1, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(30, 'Test', NULL, NULL, 'male', '2007-02-27', 'Madhya Pradesh', 'Indore', 'test@test.com', '1212121211', '5133', 0, 0, NULL, NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-27 01:54:23', 0, 0, 1, NULL),
(31, 'bdh', NULL, NULL, 'female', '2004-02-28', 'Andhra Pradesh', 'Ādoni', 'emai@email.com', '9340169945', '1929', 0, 0, NULL, NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-27 12:19:35', 0, 0, 1, NULL),
(32, 'Prashant', NULL, NULL, 'male', '2003-01-28', 'Madhya Pradesh', 'Indore', 'prashant@prashant.com', '9340169981', '7723', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-28 13:52:29', 0, 0, 1, NULL),
(33, 'hhh', NULL, NULL, 'male', '2005-01-29', 'Madhya Pradesh', 'Indore', 'ss@ss.com', '1212121213', '9578', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 10:23:17', 0, 0, 1, NULL),
(34, 'sd', NULL, NULL, 'male', '1998-02-28', 'Andhra Pradesh', 'Ādoni', 'dsd@sd.com', '1234567890', '7315', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 12:22:56', 0, 0, 1, NULL),
(35, 'sd', NULL, NULL, 'male', '2008-01-29', 'Andhra Pradesh', 'Ādoni', 'kk@ll.com', '1234567898', '7639', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 13:05:44', 0, 0, 1, NULL),
(36, 'sd', NULL, NULL, 'male', '2007-03-29', 'Andhra Pradesh', 'Addanki', 'kk@kk.com', '1212454572', '4903', 0, 0, 'test001', 'Test description', '$2b$10$RO2fWhAGEnZX49Cq6pR1.uJjrLsZm.wYD0Ftvfe/RfYPgeTt8BHGe', NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 13:09:12', 0, 0, 1, NULL),
(41, 'Test Account1', 'Test', 'Account1', 'male', '2008-02-29', 'Madhya Pradesh', 'Harda', 'test1@test.com', '1233211231', '4918', 0, 0, 'test1', 'Test Description  Test 1', '$2b$10$3G1LH/D8IwgmJKsI4SWWWuFaksMjm3Bpl4ZMVY7LkgPXwkz2vA5KK', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1732948983049.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1732951028576.jpeg', '2024-11-30 06:28:10', 0, 0, 1, NULL),
(42, 'Test Account2', 'Test', 'Account2', 'male', '2008-02-29', 'Madhya Pradesh', 'Indore', 'test2@test.com', '1234563215', '6859', 0, 0, 'test2', 'Test Description new', '$2b$10$CJXPEs91RUyfX9f3D5LCk.idHaJM1tVKw8OEf4vqXEemxSkz.5GQe', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1732969808487.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1732969898721.webp', '2024-11-30 09:29:51', 0, 0, 1, NULL),
(43, 'test003 ', 'test003', '', 'male', '2006-02-01', 'Madhya Pradesh', 'Indore', 'test3@test.com', '1254125412', '8966', 0, 0, 'test003', 'test description 003', '$2b$10$noJ70se3/3w2yGB1MzItMeCF3O6G2PVi9wMt.2I2tPPHxpIyE4mHe', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733057594306.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733057585165.webp', '2024-12-01 12:52:02', 0, 0, 1, NULL),
(44, 'test4 ', 'test4', '', 'male', '2008-02-02', 'Madhya Pradesh', 'Indore', 'test4@test.com', '1237894561', '1720', 0, 0, 'test004', 'Test Description 004', '$2b$10$RHUAXhLqKFfFvIXMz7CC8.sVPWcUwAd0GdJcwTFWQYsR7VKyWl2wm', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733116560982.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733116543861.webp', '2024-12-02 05:13:56', 0, 1, 1, NULL),
(45, 'Arti Kushwaha', 'Arti', 'Kushwaha', 'female', '1998-11-03', 'Madhya Pradesh', 'Bhopal', 'aktest@gmail.com', '7000085170', '4926', 0, 0, 'arti07', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '$2b$10$GqrpGoigu6uRrbYMLe1aRupkFR4Y1LGxRoQowBFj200g7b6BylN.a', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733222590612.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733222582167.jpeg', '2024-12-03 10:41:50', 0, 1, 1, NULL),
(46, 'Prashant ', 'Prashant', '', 'male', '2006-02-03', 'Maharashtra', 'Pune', 'gg@gg.com', '9977720000', '2331', 0, 0, 'pr-003', 'An application designed and developed to serve the purpose of traveling, like planning, booking, and managing is a travel app. An application has various other features, such as saving all the travel-related information and managing travel apps.', '$2b$10$eWLLqhNxhhbkg7WLclilwe8A6vf2GF1aWy8oz92YPIbjEEE/1GAq2', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733291489028.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733291479478.webp', '2024-12-04 05:43:28', 0, 1, 1, NULL),
(47, 'Madhulika ', 'Madhulika', '', 'female', '2008-02-06', 'Maharashtra', 'Pune', 'dhd@gmail.com', '9870516399', '8178', 0, 0, 'Madhu-07', 'An application designed and developed to serve the purpose of traveling, like planning, booking, and managing is a travel app. An application has various other features, such as saving all the travel-related information and managing travel apps.', '$2b$10$XG8n4eQsD9VcPafOJkzeVuBHbrqS3u96GLbQJjxx8qIXywDYie5.y', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733294749187.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733294709972.webp', '2024-12-04 06:39:16', 0, 1, 1, NULL),
(48, 'Narendra ', 'Narendra', '', 'male', '2006-02-09', 'Madhya Pradesh', 'Indore', 'narendra@narendra.com', '1478523691', '0610', 0, 0, 'narendra-001', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', '$2b$10$fxBKONzVqEQoKtbScGpxZeZ9dAvFiva3/puvAoMR6B9F0alHHMRyO', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733747571578.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733747584889.webp', '2024-12-09 12:30:04', 0, 1, 1, NULL),
(49, 'Anima ', 'Anima', '', 'male', '2007-02-10', 'Madhya Pradesh', 'Indore', 'anima@anima.com', '7897897896', '6492', 0, 0, 'Anima02', 'A profile description is a brief summary of your skills, experiences, and interests that you can use on social media or professional networking sites.', '$2b$10$1D7OGKV1BiJdSSsKWB2AL.DERR8IpvxCkRuHoW5zCN/QLFk3d5APG', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733810295840.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733810288168.webp', '2024-12-10 05:56:43', 0, 1, 1, NULL),
(50, 'Nikhil Tendulkar', 'Nikhil', 'Tendulkar', 'male', '2004-02-18', 'Maharashtra', 'Mumbai', 'nikhil@nikhil.com', '1122334455', '8947', 0, 0, 'nik-07', 'This is test account for Nikhil Tendulkar', '$2b$10$A2.U1k0.RLNKdxug53tBb.PAwLmxa/gnL/ZKqW1g0tWjbXRnJQ3aO', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1734520730312.jpeg', NULL, '2024-12-18 11:17:43', 0, 1, 0, 'Explorer - a person who travels around a place in order to learn about it');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bkt_lists`
--
ALTER TABLE `bkt_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `block_user`
--
ALTER TABLE `block_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bucket_list`
--
ALTER TABLE `bucket_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `buddies`
--
ALTER TABLE `buddies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments_like`
--
ALTER TABLE `comments_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `followee_id` (`followee_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `list_posts`
--
ALTER TABLE `list_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `list_id` (`list_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `location_id` (`location`);

--
-- Indexes for table `recent_search`
--
ALTER TABLE `recent_search`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reply_comment`
--
ALTER TABLE `reply_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reply_id` (`reply_id`);

--
-- Indexes for table `reply_like`
--
ALTER TABLE `reply_like`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_post`
--
ALTER TABLE `shared_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `story_likes`
--
ALTER TABLE `story_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `story_id` (`story_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `story_replies`
--
ALTER TABLE `story_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `story_shares`
--
ALTER TABLE `story_shares`
  ADD PRIMARY KEY (`id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `story_views`
--
ALTER TABLE `story_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bkt_lists`
--
ALTER TABLE `bkt_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `block_user`
--
ALTER TABLE `block_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bucket_list`
--
ALTER TABLE `bucket_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `buddies`
--
ALTER TABLE `buddies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `comments_like`
--
ALTER TABLE `comments_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=648;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `list_posts`
--
ALTER TABLE `list_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `recent_search`
--
ALTER TABLE `recent_search`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reply_comment`
--
ALTER TABLE `reply_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reply_like`
--
ALTER TABLE `reply_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `shared_post`
--
ALTER TABLE `shared_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `story_likes`
--
ALTER TABLE `story_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `story_replies`
--
ALTER TABLE `story_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `story_shares`
--
ALTER TABLE `story_shares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `story_views`
--
ALTER TABLE `story_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bkt_lists`
--
ALTER TABLE `bkt_lists`
  ADD CONSTRAINT `bkt_lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `list_posts`
--
ALTER TABLE `list_posts`
  ADD CONSTRAINT `list_posts_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `bkt_lists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `list_posts_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `story_shares`
--
ALTER TABLE `story_shares`
  ADD CONSTRAINT `story_shares_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `stories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `story_shares_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
