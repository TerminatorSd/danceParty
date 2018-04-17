-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-04-16 22:16:48
-- 服务器版本： 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- 表的结构 `activity`
--

CREATE TABLE `activity` (
  `id` int(10) NOT NULL COMMENT '自增编号',
  `name` varchar(100) NOT NULL COMMENT '活动名称',
  `label` varchar(256) NOT NULL COMMENT '活动标签',
  `time` datetime NOT NULL COMMENT '活动时间',
  `time_len` int(11) NOT NULL COMMENT '活动时长',
  `join_num` int(10) NOT NULL COMMENT '参加人数',
  `pub_dancer` varchar(100) NOT NULL COMMENT '发起者',
  `status` text NOT NULL COMMENT '状态',
  `join_dancer` text NOT NULL COMMENT '参加人员',
  `place` text NOT NULL COMMENT '活动地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `note` varchar(256) DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';

--
-- 转存表中的数据 `activity`
--

INSERT INTO `activity` (`id`, `name`, `label`, `time`, `time_len`, `join_num`, `pub_dancer`, `status`, `join_dancer`, `place`, `create_time`, `note`) VALUES
(1, 'dance', '地板舞, 震感舞', '2018-04-02 00:00:00', 2, 2, '劳华', '0', '鸡威,劳华', 'a1', '2018-04-01 00:00:00', NULL),
(2, 'powermove', '1', '2018-03-18 19:00:00', 2, 1, '劳华', '1', '劳华', 'A1', '2018-04-16 15:55:35', '死了都要练');

-- --------------------------------------------------------

--
-- 表的结构 `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL COMMENT '标签id',
  `name` varchar(256) NOT NULL COMMENT '标签名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签表';

--
-- 转存表中的数据 `label`
--

INSERT INTO `label` (`id`, `name`) VALUES
(1, 'breaking');

-- --------------------------------------------------------

--
-- 表的结构 `school`
--

CREATE TABLE `school` (
  `id` int(11) NOT NULL COMMENT '学校id',
  `name` varchar(256) NOT NULL COMMENT '学校名称',
  `city` varchar(256) NOT NULL COMMENT '所在城市'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学校表';

--
-- 转存表中的数据 `school`
--

INSERT INTO `school` (`id`, `name`, `city`) VALUES
(1, '华南理工大学', '广州'),
(3, '中山大学', '广州'),
(4, '广东工业大学', '广州');

-- --------------------------------------------------------

--
-- 表的结构 `user`
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
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `school`, `label`, `gender`, `phone`, `type`, `img_url`) VALUES
(1, '劳华', '华南理工大学', '地板舞', '男', '18925830351', '学生', NULL),
(2, 'jv', '华南理工大学', '锁舞', '男', '123456789', '学生', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user_activity`
--

CREATE TABLE `user_activity` (
  `id` int(11) NOT NULL COMMENT '自增编号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `activity_id` int(11) NOT NULL COMMENT '活动id',
  `pub_status` int(11) NOT NULL COMMENT '发布状态',
  `join_status` int(11) NOT NULL COMMENT '参与状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户活动表';

--
-- 转存表中的数据 `user_activity`
--

INSERT INTO `user_activity` (`id`, `user_id`, `activity_id`, `pub_status`, `join_status`) VALUES
(1, 1, 0, 1, 1),
(2, 1, 1, 1, 1),
(3, 1, 1, 1, 1);

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
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增编号', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标签id', AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学校id', AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增编号', AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
