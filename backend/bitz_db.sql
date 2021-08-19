CREATE DATABASE  IF NOT EXISTS `bitz_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bitz_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: i5a504.p.ssafy.io    Database: bitz_db
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `businessauth`
--

DROP TABLE IF EXISTS `businessauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businessauth` (
  `id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `birth` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businessauth`
--

LOCK TABLES `businessauth` WRITE;
/*!40000 ALTER TABLE `businessauth` DISABLE KEYS */;
INSERT INTO `businessauth` VALUES ('B1538908','yjy@naver.com','$2a$10$A7y27/GbyR2dlfYEMURWNejBjGA95PCV11TUq5TJUWgUG95jzkOHK','19971106'),('B4840407','leeadmin@gmail.com','$2a$10$r3/yvLJ52NTXpqKyTcXkp.Y.O.QOice28u13OtE7hDAjbhZIe9P9m','19930923'),('B5877575','heoadmin@gmail.com','$2a$10$oW7l0t.wgDslHSOIiI2JfOJQIA..IzE4g4RTTDKuwix4yvrvcupz2','19930823'),('B6097881','lse@gmail.com','$2a$10$bOCZGfBxf7BpYYz7uRveh.Y8BjitltP7DFepMY2gTaAdEq9hqwV/a','19960301'),('B7376479','osds@ssafy.com','$2a$10$Cir4Jpyq6cR8zAwwp2Mu0eWJhWwuEXwh9iDi4dYs74RbP.H2nFpA.','19890701'),('B7488661','kimadmin@gmail.com','$2a$10$02niOxBZ4a1UpAz7tRjYVucPuZhzCPF2g1xlC2vj1w6Ruu/tIUfde','19900608'),('B8514346','jhw@naver.com','$2a$10$GY0X1o10qS.GLbu76ivKT.5ViavGfHQ77Cp8X/z.PfSgHnHqqcYsi','19960423'),('B9569396','kow@naver.com','$2a$10$/D1hE5pg46XpJtB2g6OXx.bdRrGPLa75bT8HgejEF/1CcGYWSHQ72','19930701');
/*!40000 ALTER TABLE `businessauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businessprofile`
--

DROP TABLE IF EXISTS `businessprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businessprofile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `bank` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `business_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `businessprofile_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businessauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businessprofile`
--

LOCK TABLES `businessprofile` WRITE;
/*!40000 ALTER TABLE `businessprofile` DISABLE KEYS */;
INSERT INTO `businessprofile` VALUES (14,'윤지영','01041403184','국민','34940104269363','B1538908'),(15,'이소은','01012941046','기업','15810941601019','B6097881'),(16,'권오우','01037305215','국민','51430703486922','B9569396'),(17,'장현웅','01054046223','대구','3010421760092','B8514346'),(18,'박찬국','01038820048','신한','3404991839993','B7376479'),(20,'허웅','01098379283','국민','10283756298','B5877575'),(21,'허웅','01047659863','국민','8827982357092','B4840407');
/*!40000 ALTER TABLE `businessprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businessprofileimage`
--

DROP TABLE IF EXISTS `businessprofileimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businessprofileimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `business_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `businessprofileimage_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businessauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businessprofileimage`
--

LOCK TABLES `businessprofileimage` WRITE;
/*!40000 ALTER TABLE `businessprofileimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `businessprofileimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businessregistrationimage`
--

DROP TABLE IF EXISTS `businessregistrationimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businessregistrationimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `business_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `businessregistrationimage_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businessauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businessregistrationimage`
--

LOCK TABLES `businessregistrationimage` WRITE;
/*!40000 ALTER TABLE `businessregistrationimage` DISABLE KEYS */;
INSERT INTO `businessregistrationimage` VALUES (14,'f9a92010-5495-4237-b4e3-c30db4a9f341img.jpg','B1538908'),(15,'29607435-15be-404d-9b93-dd15789ffc36img.jpg','B6097881'),(16,'b1b85131-b6e3-4676-bec5-6969d022ef7a사업자등록증.jpg','B9569396'),(17,'a915e206-004b-4d52-9617-7d6b16e1ff18사업자등록증.jpg','B8514346'),(18,'e6977009-5c69-4739-be47-1da528aa3d40img.jpg','B7376479'),(19,'ac76f29f-331d-4f4e-b572-6b5bf248a14a사업자등록증.jpg','B7488661'),(20,'ffce0998-15b8-4c91-9906-8a1c3d0ae2dd체육관.jpg','B5877575'),(21,'42c269d2-a5fd-4ce5-820b-875aa821d0ef사업자등록증.jpg','B4840407');
/*!40000 ALTER TABLE `businessregistrationimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritelocation`
--

DROP TABLE IF EXISTS `favoritelocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritelocation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sido1` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gugun1` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sido2` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gugun2` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sido3` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gugun3` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `favoritelocation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritelocation`
--

LOCK TABLES `favoritelocation` WRITE;
/*!40000 ALTER TABLE `favoritelocation` DISABLE KEYS */;
INSERT INTO `favoritelocation` VALUES (44,'S7835200','서울','강남구','경기도','성남시','경기도','용인시'),(45,'S3428664','서울','종로구','서울','용산구',NULL,NULL),(46,'S9932447','서울','성동구','경기도','김포시','서울','금천구'),(47,'S4568064','서울','서대문구','서울','양천구','경기도','파주시'),(48,'S2656791','서울','광진구','서울','성동구','서울','노원구'),(49,'S6044732','서울','성북구','경기도','군포시','서울','중랑구'),(50,'S1908348','서울','중구',NULL,NULL,NULL,NULL),(51,'S8787745','서울','양천구','경기도','남양주시','경기도','안산시'),(52,'S2726094','서울','은평구','경기도','의정부시','경기도','광주시'),(53,'S7216898',NULL,NULL,NULL,NULL,NULL,NULL),(54,'S5684266','서울','영등포구',NULL,NULL,NULL,NULL),(55,'S3034355','서울','종로구','서울','도봉구','서울','동작구'),(56,'S2985487','서울','도봉구','경기도','화성시',NULL,NULL),(57,'S7962736','서울','동대문구',NULL,NULL,NULL,NULL),(58,'S5029100','서울','중구',NULL,NULL,NULL,NULL),(59,'S5869682','서울','동작구',NULL,NULL,NULL,NULL),(60,'S6972467','서울','성동구',NULL,NULL,NULL,NULL),(61,'S8596803','서울','송파구',NULL,NULL,NULL,NULL),(62,'S7301279','서울','종로구','서울','용산구',NULL,NULL),(63,'S2028685','서울','노원구','서울','강남구','경기도','용인시');
/*!40000 ALTER TABLE `favoritelocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `gym_id` bigint NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `min_people` int NOT NULL,
  `max_people` int NOT NULL,
  `participant` int DEFAULT '0',
  `quarter` int DEFAULT NULL,
  `participation_fee` int NOT NULL,
  `team_cnt` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `gym_id` (`gym_id`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`gym_id`) REFERENCES `gym` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (49,'2021-08-19',50,'08:00:00','10:00:00',12,18,14,0,10000,0),(50,'2021-08-20',50,'08:00:00','10:00:00',12,18,1,0,10000,0),(51,'2021-08-21',50,'08:00:00','10:00:00',12,18,1,0,10000,0),(52,'2021-08-22',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(53,'2021-08-23',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(54,'2021-08-24',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(55,'2021-08-25',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(56,'2021-08-26',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(57,'2021-08-27',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(58,'2021-08-28',50,'08:00:00','10:00:00',12,18,0,0,10000,0),(59,'2021-08-19',50,'11:00:00','13:00:00',12,18,11,0,10000,0),(60,'2021-08-20',50,'11:00:00','13:00:00',12,18,15,0,10000,0),(61,'2021-08-23',50,'11:00:00','13:00:00',12,18,0,0,10000,0),(62,'2021-08-24',50,'11:00:00','13:00:00',12,18,0,0,10000,0),(63,'2021-08-25',50,'11:00:00','13:00:00',12,18,0,0,10000,0),(64,'2021-08-26',50,'11:00:00','13:00:00',12,18,0,0,10000,0),(65,'2021-08-18',52,'01:00:00','15:00:00',12,15,0,0,10000,0),(66,'2021-08-19',50,'14:00:00','17:00:00',12,18,12,0,12000,2),(67,'2021-08-20',50,'14:00:00','17:00:00',12,18,14,0,12000,0),(68,'2021-08-19',52,'01:00:00','03:00:00',12,15,0,0,10000,0),(69,'2021-08-21',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(70,'2021-08-22',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(71,'2021-08-23',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(72,'2021-08-24',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(73,'2021-08-19',52,'03:00:00','05:00:00',12,17,0,0,8000,0),(74,'2021-08-25',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(75,'2021-08-26',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(76,'2021-08-19',51,'11:00:00','13:00:00',12,18,10,0,12000,0),(77,'2021-08-27',50,'14:00:00','17:00:00',12,18,0,0,12000,0),(78,'2021-08-19',52,'07:00:00','09:00:00',12,18,0,0,10000,0),(79,'2021-08-19',51,'15:00:00','17:00:00',12,18,11,0,15000,0),(80,'2021-08-19',52,'10:00:00','12:00:00',12,18,0,0,10000,0),(81,'2021-08-20',51,'19:00:00','21:00:00',12,18,2,0,12000,0),(82,'2021-08-19',52,'12:00:00','14:00:00',12,15,1,0,8000,0),(83,'2021-08-19',50,'19:00:00','22:00:00',12,18,6,0,12000,0),(84,'2021-08-20',50,'19:00:00','22:00:00',12,18,1,0,12000,0),(85,'2021-08-21',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(86,'2021-08-19',52,'16:00:00','18:00:00',12,15,0,0,8000,0),(87,'2021-08-22',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(88,'2021-08-23',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(89,'2021-08-24',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(90,'2021-08-25',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(91,'2021-08-20',52,'14:00:00','16:00:00',12,15,0,0,8000,0),(92,'2021-08-21',51,'09:00:00','12:00:00',12,18,3,0,15000,0),(93,'2021-08-26',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(94,'2021-08-27',50,'19:00:00','22:00:00',12,18,0,0,12000,0),(95,'2021-08-20',52,'16:00:00','18:00:00',12,15,0,0,10000,0),(96,'2021-08-20',52,'19:00:00','21:00:00',12,15,0,0,10000,0),(97,'2021-08-21',52,'14:00:00','16:00:00',12,15,0,0,8000,0),(98,'2021-08-22',51,'13:00:00','15:00:00',12,18,0,0,12000,0),(99,'2021-08-21',52,'17:00:00','19:00:00',12,17,0,0,8000,0),(100,'2021-08-21',52,'21:00:00','23:00:00',12,18,0,0,10000,0),(101,'2021-08-23',51,'20:00:00','22:00:00',12,18,0,0,12000,0),(102,'2021-08-22',52,'13:00:00','15:00:00',12,15,0,0,10000,0),(103,'2021-08-22',52,'16:00:00','18:00:00',12,15,0,0,10000,0),(104,'2021-08-22',52,'18:00:00','20:00:00',12,15,0,0,10000,0),(105,'2021-08-24',51,'19:30:00','21:30:00',12,18,0,0,12000,0),(106,'2021-08-22',52,'20:00:00','22:00:00',12,15,0,0,10000,0),(107,'2021-08-25',51,'18:30:00','21:30:00',12,18,0,0,15000,0),(108,'2021-08-23',52,'14:00:00','16:00:00',12,15,0,0,10000,0),(109,'2021-08-23',52,'17:00:00','19:00:00',12,15,0,0,10000,0),(110,'2021-08-23',52,'21:00:00','23:00:00',12,15,0,0,10000,0),(111,'2021-08-24',52,'15:00:00','17:00:00',12,15,0,0,10000,0),(112,'2021-08-24',52,'18:00:00','20:00:00',12,15,0,0,10000,0),(113,'2021-08-26',51,'13:00:00','15:00:00',12,18,0,0,12000,0),(114,'2021-08-24',52,'21:00:00','23:00:00',12,15,0,0,10000,0),(115,'2021-08-25',52,'14:00:00','16:00:00',12,15,0,0,10000,0),(116,'2021-08-25',52,'17:00:00','19:00:00',12,15,0,0,10000,0),(117,'2021-08-25',52,'20:00:00','22:00:00',12,15,0,0,10000,0),(118,'2021-08-19',53,'10:00:00','11:00:00',12,18,8,0,9000,2),(119,'2021-08-20',53,'10:00:00','12:00:00',12,18,1,0,9000,0),(120,'2021-08-23',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(121,'2021-08-24',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(122,'2021-08-25',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(123,'2021-08-26',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(124,'2021-08-27',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(125,'2021-08-30',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(126,'2021-08-31',53,'10:00:00','12:00:00',12,18,0,0,9000,0),(127,'2021-08-19',53,'17:00:00','20:00:00',12,18,9,0,13000,0),(128,'2021-08-20',53,'17:00:00','20:00:00',12,18,1,0,13000,0),(129,'2021-08-24',53,'17:00:00','20:00:00',12,18,0,0,13000,0),(130,'2021-08-26',53,'17:00:00','20:00:00',12,18,0,0,13000,0),(131,'2021-08-27',53,'17:00:00','20:00:00',12,18,0,0,13000,0),(132,'2021-08-21',51,'15:00:00','17:00:00',12,15,1,0,12000,0),(133,'2021-08-18',51,'19:00:00','22:00:00',12,15,0,0,15000,0),(134,'2021-08-21',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(135,'2021-08-22',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(136,'2021-08-28',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(137,'2021-08-29',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(138,'2021-09-03',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(139,'2021-09-23',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(140,'2021-09-21',54,'10:00:00','12:00:00',12,18,0,0,12000,0),(141,'2021-08-19',54,'18:00:00','21:00:00',12,18,0,0,13000,0),(142,'2021-08-25',54,'18:00:00','21:00:00',12,18,0,0,13000,0),(143,'2021-08-22',54,'18:00:00','21:00:00',12,18,0,0,13000,0),(144,'2021-08-19',52,'05:00:00','07:00:00',12,16,0,0,7000,0),(145,'2021-08-20',54,'12:00:00','15:00:00',12,18,0,0,18000,0),(146,'2021-08-19',55,'17:00:00','19:00:00',12,15,0,0,10000,0),(147,'2021-08-31',52,'10:00:00','12:00:00',13,17,0,0,9000,0),(148,'2021-08-19',53,'20:00:00','20:30:00',12,18,13,0,10000,2),(149,'2021-08-19',50,'20:00:00','23:59:00',12,18,12,0,12000,2),(150,'2021-08-20',56,'00:00:00','00:05:00',12,18,14,0,12000,2);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gameparticipant`
--

DROP TABLE IF EXISTS `gameparticipant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gameparticipant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `game_id` bigint DEFAULT NULL,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `state` enum('ON_DEPOSIT','WAITING','COMPLETE') CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `team` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game_id` (`game_id`),
  KEY `FK801y131e7riv39vbr4u5rqj53` (`user_id`),
  CONSTRAINT `FK801y131e7riv39vbr4u5rqj53` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=372 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gameparticipant`
--

LOCK TABLES `gameparticipant` WRITE;
/*!40000 ALTER TABLE `gameparticipant` DISABLE KEYS */;
INSERT INTO `gameparticipant` VALUES (233,83,'S1908348','WAITING',0),(234,60,'S7835200','COMPLETE',0),(235,145,'S7835200','WAITING',0),(236,67,'S7835200','COMPLETE',0),(237,60,'S6044732','COMPLETE',0),(238,145,'S6044732','WAITING',0),(239,67,'S6044732','COMPLETE',0),(240,60,'S4568064','COMPLETE',0),(241,145,'S4568064','WAITING',0),(242,67,'S4568064','COMPLETE',0),(243,60,'S9932447','COMPLETE',0),(244,145,'S9932447','WAITING',0),(245,67,'S9932447','COMPLETE',0),(246,60,'S8787745','COMPLETE',0),(247,145,'S8787745','WAITING',0),(248,67,'S8787745','COMPLETE',0),(249,60,'S2726094','COMPLETE',0),(250,145,'S2726094','WAITING',0),(251,67,'S2726094','COMPLETE',0),(252,60,'S3428664','COMPLETE',0),(253,145,'S3428664','WAITING',0),(254,67,'S3428664','COMPLETE',0),(255,60,'S5029100','COMPLETE',0),(256,145,'S5029100','WAITING',0),(257,67,'S5029100','COMPLETE',0),(258,60,'S8596803','COMPLETE',0),(259,145,'S8596803','WAITING',0),(260,67,'S8596803','COMPLETE',0),(261,60,'S1908348','COMPLETE',0),(262,145,'S1908348','WAITING',0),(263,67,'S1908348','COMPLETE',0),(264,60,'S5684266','COMPLETE',0),(265,145,'S5684266','WAITING',0),(266,67,'S5684266','COMPLETE',0),(267,60,'S5869682','COMPLETE',0),(268,145,'S5869682','WAITING',0),(269,67,'S5869682','COMPLETE',0),(270,60,'S7216898','COMPLETE',0),(271,145,'S7216898','WAITING',0),(272,67,'S7216898','ON_DEPOSIT',0),(273,60,'S7962736','COMPLETE',0),(274,145,'S7962736','WAITING',0),(275,67,'S7962736','COMPLETE',0),(276,60,'S7301279','COMPLETE',0),(277,145,'S7301279','WAITING',0),(278,67,'S7301279','COMPLETE',0),(279,50,'S7301279','COMPLETE',0),(280,119,'S7301279','COMPLETE',0),(281,91,'S7301279','WAITING',0),(282,95,'S7301279','WAITING',0),(283,128,'S7301279','COMPLETE',0),(284,84,'S7301279','COMPLETE',0),(285,96,'S7301279','WAITING',0),(286,51,'S7301279','COMPLETE',0),(287,92,'S7301279','COMPLETE',0),(288,135,'S7301279','WAITING',0),(289,52,'S7301279','WAITING',0),(290,98,'S7301279','WAITING',0),(291,70,'S7301279','WAITING',0),(292,102,'S7301279','WAITING',0),(293,103,'S7301279','WAITING',0),(294,104,'S7301279','WAITING',0),(295,143,'S7301279','WAITING',0),(296,87,'S7301279','WAITING',0),(297,106,'S7301279','WAITING',0),(298,53,'S7301279','WAITING',0),(299,120,'S7301279','WAITING',0),(300,61,'S7301279','WAITING',0),(301,71,'S7301279','WAITING',0),(302,108,'S7301279','WAITING',0),(303,109,'S7301279','WAITING',0),(304,88,'S7301279','WAITING',0),(305,101,'S7301279','WAITING',0),(306,110,'S7301279','WAITING',0),(307,54,'S7301279','WAITING',0),(308,121,'S7301279','WAITING',0),(309,62,'S7301279','WAITING',0),(310,72,'S7301279','WAITING',0),(311,111,'S7301279','WAITING',0),(312,129,'S7301279','WAITING',0),(313,112,'S7301279','WAITING',0),(314,114,'S7301279','WAITING',0),(315,105,'S7301279','WAITING',0),(316,55,'S7301279','WAITING',0),(317,122,'S7301279','WAITING',0),(318,63,'S7301279','WAITING',0),(319,74,'S7301279','WAITING',0),(320,115,'S7301279','WAITING',0),(321,116,'S7301279','WAITING',0),(322,107,'S7301279','WAITING',0),(323,142,'S7301279','WAITING',0),(324,90,'S7301279','WAITING',0),(325,117,'S7301279','WAITING',0),(326,56,'S7301279','WAITING',0),(327,123,'S7301279','WAITING',0),(328,64,'S7301279','WAITING',0),(329,113,'S7301279','WAITING',0),(330,75,'S7301279','WAITING',0),(331,130,'S7301279','WAITING',0),(332,93,'S7301279','WAITING',0),(333,148,'S1908348','COMPLETE',2),(334,149,'S1908348','COMPLETE',2),(335,148,'S2656791','COMPLETE',1),(336,149,'S2656791','COMPLETE',1),(337,148,'S2726094','COMPLETE',1),(338,149,'S2726094','COMPLETE',2),(339,148,'S2985487','COMPLETE',1),(340,149,'S2985487','COMPLETE',2),(341,148,'S3034355','COMPLETE',2),(342,149,'S3034355','COMPLETE',1),(343,148,'S3428664','COMPLETE',1),(344,149,'S3428664','COMPLETE',1),(345,148,'S4568064','COMPLETE',2),(346,149,'S4568064','COMPLETE',1),(347,148,'S5029100','COMPLETE',1),(348,149,'S5029100','COMPLETE',1),(349,148,'S5684266','COMPLETE',1),(350,149,'S5684266','COMPLETE',2),(351,148,'S5869682','COMPLETE',2),(352,149,'S5869682','COMPLETE',2),(353,148,'S6044732','COMPLETE',1),(354,149,'S6044732','COMPLETE',1),(356,148,'S6972467','COMPLETE',2),(358,148,'S7216898','COMPLETE',2),(359,149,'S7216898','COMPLETE',2),(360,150,'S7835200','COMPLETE',2),(361,150,'S6044732','COMPLETE',2),(362,150,'S4568064','COMPLETE',1),(363,150,'S9932447','COMPLETE',2),(364,150,'S2726094','COMPLETE',1),(365,150,'S8787745','COMPLETE',1),(366,150,'S2656791','COMPLETE',2),(367,150,'S1908348','COMPLETE',2),(368,150,'S2985487','COMPLETE',1),(369,150,'S7962736','COMPLETE',2),(370,150,'S8596803','COMPLETE',1),(371,150,'S2028685','COMPLETE',1);
/*!40000 ALTER TABLE `gameparticipant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamerecord`
--

DROP TABLE IF EXISTS `gamerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamerecord` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `team` int NOT NULL,
  `quarter` int NOT NULL,
  `score` int NOT NULL,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `record_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `game_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `game_id` (`game_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `gamerecord_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `gamerecord_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamerecord`
--

LOCK TABLES `gamerecord` WRITE;
/*!40000 ALTER TABLE `gamerecord` DISABLE KEYS */;
INSERT INTO `gamerecord` VALUES (165,1,1,11,'S1908348','2021-08-19 11:51:13',148),(166,2,1,12,'S1908348','2021-08-19 11:51:13',148),(167,1,1,13,'S1908348','2021-08-19 11:51:25',148),(168,2,1,15,'S1908348','2021-08-19 11:51:25',148),(169,1,1,10,'S2028685','2021-08-19 15:03:12',150),(170,2,1,12,'S2028685','2021-08-19 15:03:12',150),(171,1,2,24,'S2028685','2021-08-19 15:03:20',150),(172,2,2,20,'S2028685','2021-08-19 15:03:20',150),(173,1,3,35,'S2028685','2021-08-19 15:03:28',150),(174,2,3,34,'S2028685','2021-08-19 15:03:28',150),(175,1,4,50,'S2028685','2021-08-19 15:03:37',150),(176,2,4,49,'S2028685','2021-08-19 15:03:37',150);
/*!40000 ALTER TABLE `gamerecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamerecordlog`
--

DROP TABLE IF EXISTS `gamerecordlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamerecordlog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `game_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamerecordlog`
--

LOCK TABLES `gamerecordlog` WRITE;
/*!40000 ALTER TABLE `gamerecordlog` DISABLE KEYS */;
INSERT INTO `gamerecordlog` VALUES (41,148),(42,149),(43,83),(44,141),(45,150),(46,96),(47,50),(48,134);
/*!40000 ALTER TABLE `gamerecordlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gym`
--

DROP TABLE IF EXISTS `gym`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gym` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `business_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sido` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gugun` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `intro` text CHARACTER SET utf8 COLLATE utf8_bin,
  `notice` text CHARACTER SET utf8 COLLATE utf8_bin,
  `court_width` int NOT NULL DEFAULT '15',
  `court_length` int NOT NULL DEFAULT '28',
  `is_parking` tinyint(1) NOT NULL DEFAULT '1',
  `is_shower` tinyint(1) NOT NULL DEFAULT '1',
  `is_airconditional` tinyint(1) NOT NULL DEFAULT '1',
  `is_water` tinyint(1) NOT NULL DEFAULT '1',
  `is_basketball` tinyint(1) NOT NULL DEFAULT '1',
  `is_scoreboard` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `gym_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businessauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gym`
--

LOCK TABLES `gym` WRITE;
/*!40000 ALTER TABLE `gym` DISABLE KEYS */;
INSERT INTO `gym` VALUES (50,'B1538908','어반바스켓볼','서울','동대문구','천호대로 385 글로벌팰리스 102동 지하2층','반갑습니다. 어반바스켓볼입니다. 새로 개업하여 할인 이벤트를 진행중이에요!','★주차불가★',15,28,0,0,1,1,1,1),(51,'B8514346','고릴라짐','서울','강남구','역삼동 테헤란로 26길 502호','역삼역 3분 거리에 있습니다. 테헤란로 26길 빌딩 5층으로 들어오시면 실내체육관이 있습니다.','코로나로 인해 마스크 필수입니다. 마스크 미착용시 퇴실조치할 수 있습니다.',15,28,1,1,1,0,1,1),(52,'B9569396','뚜존 체육관','경기도','시흥시','시흥대로 947-4','소수인원 단기대관합니다!!\n9시~18시(4인까지 가능)\n18시~22시(2인까지 가능)\n시간당 15,000원(냉방비 10,000원 별도)','체육관 입장 시 농구화 착용 부탁드립니다.',14,23,1,0,1,0,1,1),(53,'B1538908','인아우트','서울','마포구','와우산로13길 6 지하2층','어서오세요. 인아우트입니다! 스킬트레이닝 클래스 OPEN 했으니 많은 참여 부탁드려요~^^*','코로나19사태로 마스크는 필수착용입니다. 다들 배려해주세요~~^0^',15,28,0,0,1,1,1,1),(54,'B6097881','홍제농구장','서울','서대문구','통일로 448 B2호','실내농구장입니다. 홍제역 1번출구 100m이내에 위치하고 있습니다.','마스크 필수 착용입니다. 주의해주세요.',15,28,1,1,1,1,1,1),(55,'B7376479','서울오반체육관','서울','강남구','서울특별시 강남구 역삼동 테헤란로 212','안녕하세요~ 서울 5반의 4팀 체육관입니다. ','코로나로 인하여 마스크 착용이 필수입니다. 코로나 확산 방지에 주의해주시길 바랍니다.',30,16,1,1,1,1,1,1),(56,'B5877575','삼육체육관','서울','노원구','화랑로 815','안녕하세요! 삼육체육관입니다. 오픈기념으로 할인 중이니 많이 방문해주세요^^*','코라나 19 사태로 마스크 착용이 필수입니다. 주의해주세용^^',15,28,0,0,1,1,1,1);
/*!40000 ALTER TABLE `gym` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gymimage`
--

DROP TABLE IF EXISTS `gymimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gymimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gym_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `gym_id` (`gym_id`),
  CONSTRAINT `gymimage_ibfk_1` FOREIGN KEY (`gym_id`) REFERENCES `gym` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gymimage`
--

LOCK TABLES `gymimage` WRITE;
/*!40000 ALTER TABLE `gymimage` DISABLE KEYS */;
INSERT INTO `gymimage` VALUES (9,'e65c24a1-7c10-4ab2-9762-08ff750330a9gym1.jpg',50),(10,'151d93ea-d545-4c22-8d52-d27044024fb8체육관.jpg',51),(11,'fc4863a6-6fa6-42dd-8ee5-9f65037be50e체육관.png',52),(14,'8142c6d5-6b8c-4ecd-8f08-36cb12b54807gym2.jpg',53),(15,'6079b9a8-43c1-474b-9f43-c589ee97fa52gym3.jpg',54),(16,'8ab83121-11fc-4aac-9c66-c02bedaf2aa7체육관.png',55),(17,'79ecee77-e942-4654-9479-bed0e146b3ac체육관.jpg',56);
/*!40000 ALTER TABLE `gymimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gymreview`
--

DROP TABLE IF EXISTS `gymreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gymreview` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `gym_id` bigint NOT NULL,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `rate` int DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `gym_id` (`gym_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `gymreview_ibfk_1` FOREIGN KEY (`gym_id`) REFERENCES `gym` (`id`),
  CONSTRAINT `gymreview_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gymreview`
--

LOCK TABLES `gymreview` WRITE;
/*!40000 ALTER TABLE `gymreview` DISABLE KEYS */;
INSERT INTO `gymreview` VALUES (9,53,'S5869682',0,'2021-08-19 12:14:40'),(10,53,'S2985487',0,'2021-08-19 12:33:13'),(11,56,'S2028685',0,'2021-08-19 15:10:18');
/*!40000 ALTER TABLE `gymreview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loginlog`
--

DROP TABLE IF EXISTS `loginlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginlog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `is_general` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loginlog`
--

LOCK TABLES `loginlog` WRITE;
/*!40000 ALTER TABLE `loginlog` DISABLE KEYS */;
INSERT INTO `loginlog` VALUES (60,'yjy@naver.com',0),(61,'jhw@naver.com',0),(62,'kow@naver.com',0),(63,'lse@gmail.com',0),(64,'ds6tvi@naver.com',1),(65,'yoonjy1106@naver.com',1),(66,'jmh@naver.com',1),(67,'kyh@naver.com',1),(68,'cbk@gmail.com',1),(69,'kdb@naver.com',1),(70,'good_jiwo@gmail.com',1),(71,'lyj@naver.com',1),(72,'pjs@naver.com',1),(73,'znzldghdlf@naver.com',1),(74,'guswls@naver.com',1),(75,'gustjq1101@gmail.com',1),(76,'kwonow1@naver.com',1),(77,'ypk@daum.net',1),(78,'mke@naver.com',1),(79,'ksh@naver.com',1),(80,'hjy@naver.com',1),(81,'cjy@naver.com',1),(82,'kimssafy@ssafy.com',1),(83,'osds@ssafy.com',0),(84,'heoadmin@gmail.com',0),(85,'kwonow@gmail.com',1);
/*!40000 ALTER TABLE `loginlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manner`
--

DROP TABLE IF EXISTS `manner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manner` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `score` int DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `record_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `manner_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manner`
--

LOCK TABLES `manner` WRITE;
/*!40000 ALTER TABLE `manner` DISABLE KEYS */;
INSERT INTO `manner` VALUES (174,'S1908348',1,'2021-08-19 11:51:13',NULL),(175,'S1908348',1,'2021-08-19 11:51:14',NULL),(176,'S1908348',1,'2021-08-19 11:51:25',NULL),(177,'S1908348',1,'2021-08-19 11:51:25',NULL),(178,'S2656791',10,'2021-08-19 12:14:40',NULL),(179,'S3428664',10,'2021-08-19 12:14:40',NULL),(180,'S2985487',10,'2021-08-19 12:14:40',NULL),(181,'S5029100',10,'2021-08-19 12:14:40',NULL),(182,'S1908348',10,'2021-08-19 12:14:40',NULL),(183,'S3034355',10,'2021-08-19 12:14:40',NULL),(184,'S5869682',10,'2021-08-19 12:14:40',NULL),(185,'S7216898',10,'2021-08-19 12:14:40',NULL),(186,'S2726094',-10,'2021-08-19 12:14:40',NULL),(187,'S5684266',-10,'2021-08-19 12:14:40',NULL),(188,'S6044732',-10,'2021-08-19 12:14:40',NULL),(189,'S4568064',-10,'2021-08-19 12:14:40',NULL),(190,'S6972467',-10,'2021-08-19 12:14:40',NULL),(191,'S2985487',10,'2021-08-19 12:33:13',NULL),(192,'S5684266',10,'2021-08-19 12:33:13',NULL),(193,'S2028685',1,'2021-08-19 15:03:12',NULL),(194,'S2028685',1,'2021-08-19 15:03:12',NULL),(195,'S2028685',1,'2021-08-19 15:03:20',NULL),(196,'S2028685',1,'2021-08-19 15:03:20',NULL),(197,'S2028685',1,'2021-08-19 15:03:28',NULL),(198,'S2028685',1,'2021-08-19 15:03:28',NULL),(199,'S2028685',1,'2021-08-19 15:03:37',NULL),(200,'S2028685',1,'2021-08-19 15:03:37',NULL),(201,'S4568064',10,'2021-08-19 15:10:18',NULL),(202,'S2726094',10,'2021-08-19 15:10:18',NULL),(203,'S8787745',10,'2021-08-19 15:10:18',NULL),(204,'S2985487',10,'2021-08-19 15:10:18',NULL),(205,'S6044732',10,'2021-08-19 15:10:18',NULL),(206,'S2656791',10,'2021-08-19 15:10:18',NULL),(207,'S7962736',10,'2021-08-19 15:10:19',NULL),(208,'S8596803',-10,'2021-08-19 15:10:19',NULL),(209,'S2028685',-10,'2021-08-19 15:10:19',NULL),(210,'S7835200',-10,'2021-08-19 15:10:19',NULL),(211,'S9932447',-10,'2021-08-19 15:10:19',NULL),(212,'S1908348',-10,'2021-08-19 15:10:19',NULL);
/*!40000 ALTER TABLE `manner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `guard` tinyint(1) DEFAULT '0',
  `center` tinyint(1) DEFAULT '0',
  `forward` tinyint(1) DEFAULT '0',
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `position_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (44,1,1,0,'S7835200'),(45,1,1,1,'S3428664'),(46,0,0,1,'S9932447'),(47,1,0,0,'S4568064'),(48,0,1,0,'S2656791'),(49,0,0,1,'S6044732'),(50,1,1,0,'S1908348'),(51,1,0,0,'S8787745'),(52,0,1,1,'S2726094'),(53,1,0,0,'S7216898'),(54,1,1,1,'S5684266'),(55,0,1,0,'S3034355'),(56,1,0,0,'S2985487'),(57,1,1,1,'S7962736'),(58,1,0,0,'S5029100'),(59,0,0,1,'S5869682'),(60,0,1,1,'S6972467'),(61,1,0,1,'S8596803'),(62,1,0,1,'S7301279'),(63,1,0,0,'S2028685');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken` (
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `is_general` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_email`),
  UNIQUE KEY `id_UNIQUE` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtoken`
--

LOCK TABLES `refreshtoken` WRITE;
/*!40000 ALTER TABLE `refreshtoken` DISABLE KEYS */;
INSERT INTO `refreshtoken` VALUES ('cbk@gmail.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYmtAZ21haWwuY29tIiwiZXhwIjoxNjI5Mzg2Mjg4fQ.nWPomSuJKqfmIYtm_o_EBUzPdHmwKAUG_zrY_HEVnpw','2021-08-19 14:44:32',NULL,1),('cjy@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjanlAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2Mzg4fQ.CbkEshygV7FUpKnlhMtdj2UdhFHsTuJsXe3XrGNHRx8','2021-08-19 14:46:12',NULL,1),('ds6tvi@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkczZ0dmlAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2MTM5fQ.fQlrA8AB5B8fv78-6JiIflm8pdY-nQ75tHkLXmqo9Y0','2021-08-19 14:42:04',NULL,1),('good_jiwo@gmail.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29kX2ppd29AZ21haWwuY29tIiwiZXhwIjoxNjI5Mzg2MzA4fQ.JJG3IZGKrgMRRXwfgNN73OZUtwd3APsyQ9Jys0hEsiA','2021-08-19 14:44:53',NULL,1),('gustjq1101@gmail.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndXN0anExMTAxQGdtYWlsLmNvbSIsImV4cCI6MTYyOTM4MjA2MH0.x2MSLjAq32n3pricizW95gzvqBqOOwhU4qj4dnz7IZA','2021-08-19 13:34:05',NULL,1),('guswls@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndXN3bHNAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzc1MjUxfQ.RvjJQsRbSq2O5f1QWkDJDC8QHgDvFkRPiFt1mdqRf-0','2021-08-19 11:40:36',NULL,1),('hjy@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoanlAbmF2ZXIuY29tIiwiZXhwIjoxNjI5MzgxMDk2fQ.XrgCTEAUyNZyfbVj_PhMOxojbq1lJ3H7vb8OvW3XYr8','2021-08-19 13:18:00',NULL,1),('jmh@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbWhAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2MjAyfQ.YFmNk_PcmObNMqYrJk3yoPU9blbw3Xrk4rjCPPQbwSM','2021-08-19 14:43:07',NULL,1),('kdb@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZGJAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2MTY1fQ.CarEQcr4DX7tHIzjS9KW7rTVKWuvK3vT7cK7n9DEFyc','2021-08-19 14:42:30',NULL,1),('kimssafy@ssafy.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraW1zc2FmeUBzc2FmeS5jb20iLCJleHAiOjE2MjkzNjQ5OTZ9.IsSn1vxMvKFBKRWS32CfwKSQuBlTRk9BLxn4WEqIkls','2021-08-19 08:49:40',NULL,1),('ksh@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrc2hAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzc2MDgxfQ.YW1fBXouJkDbUxZjg2Mn-zuv6IEn-7k18rxS9BmNH_k','2021-08-19 11:54:25',NULL,1),('kwonow1@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrd29ub3cxQG5hdmVyLmNvbSIsImV4cCI6MTYyOTM4ODYwNn0.ZY8d-xykbeBA9eI0KOODAXLNOrWDK0Etxz1xrbYEbgo','2021-08-19 15:23:10',NULL,1),('kwonow@gmail.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrd29ub3dAZ21haWwuY29tIiwiZXhwIjoxNjI5Mzg2NDE0fQ.5f9YFzAOsLYUiMsIDBsA5a-ttw1BsiImx770hHYAlDE','2021-08-19 14:46:38',NULL,1),('kyh@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJreWhAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2MTg3fQ.ZMGWmqQUFi2yQq1mDpO-C6x30FaIqS0UItNqt3wp2jM','2021-08-19 14:42:52',NULL,1),('lyj@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJseWpAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2MjY3fQ.lsTPaP2ny0RJUniV_KUHZewH8fYd-tq4a3NkFUad5kQ','2021-08-19 14:44:11',NULL,1),('mke@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJta2VAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzc1MjMwfQ.lVHNVGybWX_6QDSfdxYieWanhWXKOUQz6rf5LwNl7qc','2021-08-19 11:40:15',NULL,1),('pjs@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwanNAbmF2ZXIuY29tIiwiZXhwIjoxNjI5Mzg2MjE3fQ.drEYH-hHJdwNhvVzrndDI8V4aOeRmdaBquplJnYMWg0','2021-08-19 14:43:22',NULL,1),('yoonjy1106@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b29uankxMTA2QG5hdmVyLmNvbSIsImV4cCI6MTYyOTM3NTE5NH0.faehM9xVitnb-W6MZH9Ys3p-7MnsvaUmRLcpbiA-Cac','2021-08-19 11:39:38',NULL,1),('ypk@daum.net','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5cGtAZGF1bS5uZXQiLCJleHAiOjE2MjkzODYzNTB9.VUwnnf-3RMdZ5186KwVSl8Zoy6cYFDXFwDPyvqnMnu0','2021-08-19 14:45:34',NULL,1),('znzldghdlf@naver.com','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6bnpsZGdoZGxmQG5hdmVyLmNvbSIsImV4cCI6MTYyOTM3NTM0Mn0.V_Lz8PdBMxBf04FjqVzBYn4mvRNgyKS2irEI1QgXCsA','2021-08-19 11:42:07',NULL,1);
/*!40000 ALTER TABLE `refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `win_cnt` int DEFAULT NULL,
  `lose_cnt` int DEFAULT NULL,
  `tie_cnt` int DEFAULT NULL,
  `mvp_cnt` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (67,'S1908348',1,1,0,1),(68,'S2656791',0,2,0,0),(69,'S2726094',1,1,0,0),(70,'S2985487',1,1,0,2),(71,'S3034355',1,0,0,0),(72,'S3428664',0,1,0,0),(73,'S4568064',2,0,0,0),(74,'S5029100',0,1,0,0),(75,'S5684266',0,1,0,0),(76,'S5869682',1,0,0,0),(77,'S6044732',0,2,0,0),(78,'S6972467',1,0,0,0),(79,'S7216898',1,0,0,0),(80,'S7835200',0,1,0,0),(81,'S7962736',0,1,0,0),(82,'S8596803',1,0,0,0),(83,'S8787745',1,0,0,0),(84,'S9932447',0,1,0,0),(85,'S7301279',0,0,0,0),(86,'S2028685',1,0,0,0);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userauth`
--

DROP TABLE IF EXISTS `userauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userauth` (
  `id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `birth` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uID_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userauth`
--

LOCK TABLES `userauth` WRITE;
/*!40000 ALTER TABLE `userauth` DISABLE KEYS */;
INSERT INTO `userauth` VALUES ('S1908348','good_jiwo@gmail.com','$2a$10$PoZyuTrbQjdWat60F7EknOiufpbt58keo6Z1hAHttNQ5/waKDoee6','19971104'),('S2028685','kwonow@gmail.com','$2a$10$lteR3Tu2dBXGv1ZZB5.QyejDeFW/5N93MjFfXNJWW0Av9gUEQeOBW','19930326'),('S2656791','cbk@gmail.com','$2a$10$FQMVF8woj1LzFOsdYq2l6eGZAduJtw4IBC.Pa5emYLTgcCrmVUaA.','19950423'),('S2726094','pjs@naver.com','$2a$10$hCNUR6X0hO9Y.b6p.TpZR.GeP77aRxZhuy/bx3nmo89wXL2GsDOUm','19960714'),('S2985487','kwonow1@naver.com','$2a$10$j4cMyKEzy7D8UpeU9j2AA.evF.fvViikoSvE7OlCdJ7e7/MjJGYvu','19990323'),('S3034355','gustjq1101@gmail.com','$2a$10$K/m4wWIL/mRXtqYYajv1EO3Y68xwF1lx53mjj9nbQX9GnESxZrg9.','19880107'),('S3428664','yoonjy1106@naver.com','$2a$10$lExlMOMwdyeIADemAD0IqO5oM3sJoCWGRc5Ar/gvaLEI/lEk4vxQG','19971106'),('S4568064','kyh@naver.com','$2a$10$tv76Z4NhNveNETK.LFVBCOESRFmlCQke10DiKnKVCbm/yM2PpkF0m','19960917'),('S5029100','mke@naver.com','$2a$10$l4aw2znDlwtmWHUht4y4HOjLO4V.7t3qSYF6Lhm223/mhQwl.hiAi','19960204'),('S5684266','guswls@naver.com','$2a$10$usdgWZbjBP5UOC1b.rTWMOPwyzkl09yPVI/UAUjZBCIpNM08M4z/O','19900107'),('S5869682','ksh@naver.com','$2a$10$guWRq9JYMFb64HSL35rIVuQnl/B2DQtvbCPy.5zbWzpFSJmb.BjZK','19950702'),('S6044732','kdb@naver.com','$2a$10$Qi8KNmtTrhsvccIf0/A7W.dQqDunjss5hQBnQ.HOOmERVnDWMY3kW','19870321'),('S6972467','hjy@naver.com','$2a$10$VbNiN3lgqJgszBoCHJiTCOLssjcafi3noDzzC8vaLhX1PUhMoGEcG','19921102'),('S7216898','znzldghdlf@naver.com','$2a$10$NSmbDrQnIGbkR/cRVmona..95gvWGD3e3T53oYGebcKN3me52ZWwy','19970326'),('S7301279','kimssafy@ssafy.com','$2a$10$iJEdsBk6QOQPFoPrVbztpeg8TY9oJXuioImS4Co7jlzjmVWdvQ9TK','19971030'),('S7835200','ds6tvi@naver.com','$2a$10$evkw7Knz9In3Uyu/vnFWa.H250YlZddC2idShHVU2DnLMaLNFsH72','19960627'),('S7962736','ypk@daum.net','$2a$10$u0RdfahQlaoOXw3k1shqkeuidaC4vM1CDdqhUQAxOTI30j/EpybE6','19871028'),('S8596803','cjy@naver.com','$2a$10$nchxl8SRncfNcJHuXTshEumlUYxV/AvXsDq5JOnZ8KYpKUZqroYbK','19910124'),('S8787745','lyj@naver.com','$2a$10$rFJJXnxHXhLndBnMS.Q/pe3dMceUy6yhlSngvCi7tqbTG/gSDMPDm','19950224'),('S9932447','jmh@naver.com','$2a$10$A6Qc2lF5ScC92a4JG6sn3u.u0VNzeiCBk9h38VjFtXktEYzZW9rTa','19961111');
/*!40000 ALTER TABLE `userauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nickname` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `location` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `height` int DEFAULT NULL,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
INSERT INTO `userprofile` VALUES (61,'이현중','Davison','01052348572',NULL,177,'S2985487'),(62,'장현우','장발장','01054046223',NULL,180,'S7835200'),(63,'윤지영','팡이맘','01041403184',NULL,187,'S3428664'),(64,'김선형','플래쉬썬','01042859238',NULL,186,'S5869682'),(65,'장민호','최강통키','01075439980',NULL,183,'S9932447'),(66,'최지우','지우오우','01037441935',NULL,196,'S1908348'),(67,'최준용','악동','01046273295',NULL,202,'S8596803'),(68,'김영환','미라클','01048951764',NULL,179,'S4568064'),(69,'신슬기','슬구','01073772893',NULL,178,'S7216898'),(70,'현주엽','매직히포','01017487823',NULL,194,'S6972467'),(71,'김덕배','덕배킴','01077448555',NULL,169,'S6044732'),(72,'김현진','면지니','01076633434',NULL,192,'S5684266'),(73,'최부경','유아마이부','01096643286',NULL,200,'S2656791'),(74,'이유진','이도류','01010047543',NULL,167,'S8787745'),(75,'문경은','람보슈터','01053698872',NULL,183,'S5029100'),(76,'박재성','미스터팍','01023421789',NULL,185,'S2726094'),(77,'정현섭','현섭쓰','01011034798',NULL,186,'S3034355'),(78,'윤필경','경경이','01097862672',NULL,176,'S7962736'),(79,'김싸피','싸피좋아','01028839946',NULL,180,'S7301279'),(80,'권오우','농구왕통키','01044721972',NULL,186,'S2028685');
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofileimage`
--

DROP TABLE IF EXISTS `userprofileimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofileimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_id` char(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iduserprofileimage_UNIQUE` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userprofileimage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userauth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofileimage`
--

LOCK TABLES `userprofileimage` WRITE;
/*!40000 ALTER TABLE `userprofileimage` DISABLE KEYS */;
INSERT INTO `userprofileimage` VALUES (33,'7466ab2c-edbb-4ea8-9b3d-9ce525941b50aar-creation-P6FN_jhB4gs-unsplash.jpg','S2656791'),(34,'0671c9c8-5cb8-4884-8f1d-7488b0c23a5aprofile1.PNG','S1908348'),(35,'0be46105-46e6-4062-a411-3ad200e47946profile2.jpg','S3428664'),(36,'f5eb9353-0b60-4a5b-b4e4-63b58ce58bc2나연.PNG','S2726094'),(37,'b1375394-c677-4674-836c-729a3cb6866a다현.PNG','S6044732'),(38,'d74ede70-fc16-4c6f-a786-44b35740bc6c모모.PNG','S8787745'),(39,'3b40350d-fb4a-4e75-85fb-65febeee8eb0정연.PNG','S4568064'),(40,'8055ec66-b337-45e9-9521-8cd5e165b8ba지효.PNG','S9932447'),(41,'a9fc22ed-928d-4f44-8178-e0e5b63d5be5미나.PNG','S7835200'),(42,'6a38b835-c8df-4bac-9346-e226f4825b50캡처1.PNG','S2985487'),(43,'83b8d8ed-65aa-48d2-8179-2be3ba1f7cd8캡처2.PNG','S5029100'),(44,'1eb284aa-d9fc-4495-ae3d-8afb8284ff70캡처3.PNG','S5869682'),(46,'b245992b-6b16-4e37-b738-a82e72edfedb캡처4.PNG','S6972467'),(47,'4b76a2eb-5e05-463e-b3d2-3639c6df577d캡처5.PNG','S8596803'),(48,'30627f93-895e-4518-9d98-11e0b57b824d찬혁.PNG','S5684266'),(49,'7c2a3dd1-4e3c-4a68-bf5e-23b34b868eeb지코.PNG','S7216898'),(50,'1b245ac8-2b75-44b9-b66d-2badf7958585피오.PNG','S7962736'),(51,'df88b98c-9e1d-4853-a0a4-4d2138e8a295운영자.PNG','S7301279'),(52,'77850bf3-4d7b-4a11-a666-aeb20d142006프로필 사진.png','S2028685');
/*!40000 ALTER TABLE `userprofileimage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-20  0:38:10
