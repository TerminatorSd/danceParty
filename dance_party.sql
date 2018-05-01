-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2018 at 03:03 AM
-- Server version: 5.7.21
-- PHP Version: 7.1.14

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
  `time_len` int(11) NOT NULL COMMENT '活动时长',
  `join_num` int(10) DEFAULT NULL COMMENT '参加人数',
  `pub_dancer_id` int(11) NOT NULL,
  `pub_dancer` varchar(100) NOT NULL COMMENT '发起者',
  `status` text NOT NULL COMMENT '状态',
  `join_dancer` text COMMENT '参加人员',
  `place` text NOT NULL COMMENT '活动地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `note` varchar(256) DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `name`, `label`, `time`, `time_len`, `join_num`, `pub_dancer_id`, `pub_dancer`, `status`, `join_dancer`, `place`, `create_time`, `note`) VALUES
(1, 'dance', '地板舞, 震感舞', '2018-04-02 00:00:00', 2, 3, 0, '劳华', '0', '鸡威,劳华', 'a1', '2018-04-01 00:00:00', NULL),
(2, 'powermove', '1', '2018-03-18 19:00:00', 2, 1, 0, '劳华', '1', '劳华', 'A1', '2018-04-16 15:55:35', '死了都要练'),
(5, 'adfds', '破瓶,黑怕', '2018-03-18 19:00:00', 2, 6, 0, 'zuihouyici', '0', 'zuihouyici', 'asdf', '2018-04-30 14:36:56', 'df'),
(6, 'hahahah', '地板舞,破瓶,黑怕', '2018-03-18 19:00:00', 2, 0, 0, 'zuihouyici', '1', NULL, 'asdfds', '2018-04-30 14:38:17', 'asdfad'),
(7, 'adfad', '破瓶,黑怕', '2018-03-18 19:00:00', 2, 0, 0, 'zuihouyici', '1', NULL, 'asdf', '2018-04-30 14:38:35', 'adf'),
(8, '发布活动了啊', '破瓶,黑怕', '2018-03-18 19:00:00', 1, 1, 7, '少东', '1', '少东', '爱的发的撒', '2018-05-01 09:39:06', '哈哈哈哈'),
(9, '又来发布活动', '破瓶,黑怕', '2018-03-18 19:00:00', 2, 1, 7, '少东', '0', '少东', '舞室', '2018-05-01 09:40:05', '打发点'),
(10, '我发布的活动', '破瓶,黑怕', '2018-03-18 19:00:00', 1, 1, 7, '少东', '0', '少东', '发大多数', '2018-05-01 09:46:31', '阿道夫'),
(11, 'hahaha', '黑怕,锁舞', '2018-04-02 00:00:00', 1, 1, 7, '少东', '0', '少东', 'adfsadf', '2018-05-01 10:09:37', 'adfds');

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL COMMENT '标签id',
  `name` varchar(256) NOT NULL COMMENT '标签名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签表';

--
-- Dumping data for table `label`
--

INSERT INTO `label` (`id`, `name`) VALUES
(1, 'breaking');

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
  `school` varchar(256) DEFAULT NULL,
  `label` varchar(256) NOT NULL COMMENT '标签',
  `gender` varchar(256) NOT NULL COMMENT '性别',
  `phone` text NOT NULL COMMENT '电话',
  `type` varchar(256) NOT NULL COMMENT '身份类型',
  `img_url` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `school`, `label`, `gender`, `phone`, `type`, `img_url`) VALUES
(1, '劳华', '华南理工大学', '地板舞', '男', '18925830351', '学生', NULL),
(2, 'jv', '华南理工大学', '锁舞', '男', '123456789', '学生', NULL),
(3, '测试添加', '华工', '地板舞,破瓶', '男生', '2313123', '社会工作者', 'uploads/1525058699851-timg.jpeg'),
(4, '哈喽', '中大', '破瓶,黑怕', '男生', '12312312', '社会工作者', ''),
(5, '哈喽', '中大', '破瓶,黑怕', '男生', '12312312', '社会工作者', ''),
(6, 'hahah', '广工', '破瓶,黑怕', '男生', '123123', '社会工作者', 'uploads/1525058927798-UI.jpg'),
(7, '少东', '华南理工大学大学城', '地板舞,锁舞', '男生', '232432543534', '学生', 'uploads/1525059003081-WechatIMG1.jpeg');

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
-- Dumping data for table `user_activity`
--

INSERT INTO `user_activity` (`id`, `user_id`, `activity_id`, `pub_status`, `join_status`) VALUES
(1, 1, 0, 1, 1),
(2, 1, 1, 1, 1),
(6, 7, 1, 1, 2),
(10, 7, 5, 1, 2),
(16, 7, 9, 1, 2);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增编号', AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标签id', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学校id', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增编号', AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
