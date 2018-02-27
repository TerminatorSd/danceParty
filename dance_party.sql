-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2018 at 01:45 AM
-- Server version: 5.7.21
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dance_party`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(10) NOT NULL COMMENT '自增编号',
  `name` varchar(100) NOT NULL COMMENT '活动名称',
  `label` varchar(256) NOT NULL COMMENT '活动标签',
  `time` datetime NOT NULL COMMENT '活动时间',
  `join_num` int(10) NOT NULL COMMENT '参加人数',
  `pub_dancer` varchar(100) NOT NULL COMMENT '发起者',
  `status` text NOT NULL COMMENT '状态',
  `join_dancer` text NOT NULL COMMENT '参加人员',
  `place` text NOT NULL COMMENT '活动地址',
  `create_time` datetime NOT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL COMMENT '标签id',
  `name` varchar(256) NOT NULL COMMENT '标签名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签表';

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` int(11) NOT NULL COMMENT '学校id',
  `name` varchar(256) NOT NULL COMMENT '学校名称',
  `city` varchar(256) NOT NULL COMMENT '所在城市'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学校表';

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`id`, `name`, `city`) VALUES
(1, '华南理工大学', '广州'),
(3, '中山大学', '广州'),
(4, '广东工业大学', '广州');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(256) NOT NULL COMMENT '用户名称',
  `school` varchar(256) NOT NULL COMMENT '学校',
  `label` varchar(256) NOT NULL COMMENT '标签',
  `gender` varchar(256) NOT NULL COMMENT '性别',
  `phone` text NOT NULL COMMENT '电话'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
  `id` int(11) NOT NULL COMMENT '自增编号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `activity_id` int(11) NOT NULL COMMENT '活动id',
  `pub_status` int(11) NOT NULL COMMENT '发布状态',
  `join_status` int(11) NOT NULL COMMENT '参与状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户活动表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增编号';

--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标签id';

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学校id', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id';

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增编号';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
