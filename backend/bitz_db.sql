CREATE DATABASE  IF NOT EXISTS `bitz_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bitz_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bitz_db
-- ------------------------------------------------------
-- Server version	8.0.25

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
  `bID` char(8) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `birth` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`bID`),
  UNIQUE KEY `bID_UNIQUE` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businessauth`
--

LOCK TABLES `businessauth` WRITE;
/*!40000 ALTER TABLE `businessauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `businessauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businessprofile`
--

DROP TABLE IF EXISTS `businessprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businessprofile` (
  `bID` char(8) COLLATE utf8_bin NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) COLLATE utf8_bin NOT NULL,
  `bank` varchar(10) COLLATE utf8_bin NOT NULL,
  `account` varchar(25) COLLATE utf8_bin NOT NULL,
  `business_registration` blob NOT NULL,
  PRIMARY KEY (`bID`),
  UNIQUE KEY `bID_UNIQUE` (`bID`),
  CONSTRAINT `businessprofile_ibfk_1` FOREIGN KEY (`bID`) REFERENCES `businessauth` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businessprofile`
--

LOCK TABLES `businessprofile` WRITE;
/*!40000 ALTER TABLE `businessprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `businessprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritelocation`
--

DROP TABLE IF EXISTS `favoritelocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritelocation` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `sido1` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `gugun1` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `sido2` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `gugun2` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `sido3` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `gugun3` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  CONSTRAINT `favoritelocation_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritelocation`
--

LOCK TABLES `favoritelocation` WRITE;
/*!40000 ALTER TABLE `favoritelocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritelocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameID` char(8) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  `gymID` char(8) COLLATE utf8_bin NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `minPeople` int NOT NULL,
  `maxPeople` int NOT NULL,
  `participant` int NOT NULL DEFAULT '0',
  `quarter` int DEFAULT NULL,
  PRIMARY KEY (`gameID`),
  UNIQUE KEY `gameID_UNIQUE` (`gameID`),
  KEY `gymID` (`gymID`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`gymID`) REFERENCES `gyminfo` (`gymID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gameparticipant`
--

DROP TABLE IF EXISTS `gameparticipant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gameparticipant` (
  `gameID` char(8) COLLATE utf8_bin NOT NULL,
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `state` int NOT NULL,
  `team` int DEFAULT NULL,
  KEY `gameID` (`gameID`),
  KEY `uID` (`uID`),
  CONSTRAINT `gameparticipant_ibfk_1` FOREIGN KEY (`gameID`) REFERENCES `game` (`gameID`),
  CONSTRAINT `gameparticipant_ibfk_2` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gameparticipant`
--

LOCK TABLES `gameparticipant` WRITE;
/*!40000 ALTER TABLE `gameparticipant` DISABLE KEYS */;
/*!40000 ALTER TABLE `gameparticipant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamerecord`
--

DROP TABLE IF EXISTS `gamerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamerecord` (
  `gameID` char(8) COLLATE utf8_bin NOT NULL,
  `team` int NOT NULL,
  `quarter` int NOT NULL,
  `score` int NOT NULL,
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `recordTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `gameID` (`gameID`),
  KEY `uID` (`uID`),
  CONSTRAINT `gamerecord_ibfk_1` FOREIGN KEY (`gameID`) REFERENCES `game` (`gameID`),
  CONSTRAINT `gamerecord_ibfk_2` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamerecord`
--

LOCK TABLES `gamerecord` WRITE;
/*!40000 ALTER TABLE `gamerecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamerecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gyminfo`
--

DROP TABLE IF EXISTS `gyminfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gyminfo` (
  `gymID` char(8) COLLATE utf8_bin NOT NULL,
  `bID` char(8) COLLATE utf8_bin NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `address` varchar(100) COLLATE utf8_bin NOT NULL,
  `courtWidth` int NOT NULL DEFAULT '15',
  `courtLength` int NOT NULL DEFAULT '28',
  `isParking` tinyint(1) NOT NULL DEFAULT '1',
  `isShower` tinyint(1) NOT NULL DEFAULT '1',
  `isAirConditional` tinyint(1) NOT NULL DEFAULT '1',
  `isWater` tinyint(1) NOT NULL DEFAULT '1',
  `isBasketball` tinyint(1) NOT NULL DEFAULT '1',
  `isScoreboard` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`gymID`),
  UNIQUE KEY `gymID_UNIQUE` (`gymID`),
  KEY `bID` (`bID`),
  CONSTRAINT `gyminfo_ibfk_1` FOREIGN KEY (`bID`) REFERENCES `businessauth` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gyminfo`
--

LOCK TABLES `gyminfo` WRITE;
/*!40000 ALTER TABLE `gyminfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `gyminfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gymreview`
--

DROP TABLE IF EXISTS `gymreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gymreview` (
  `gymID` char(8) COLLATE utf8_bin NOT NULL,
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `text` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  KEY `gymID` (`gymID`),
  CONSTRAINT `gymreview_ibfk_1` FOREIGN KEY (`gymID`) REFERENCES `gyminfo` (`gymID`),
  CONSTRAINT `gymreview_ibfk_2` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gymreview`
--

LOCK TABLES `gymreview` WRITE;
/*!40000 ALTER TABLE `gymreview` DISABLE KEYS */;
/*!40000 ALTER TABLE `gymreview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loginlog`
--

DROP TABLE IF EXISTS `loginlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginlog` (
  `id` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `loginlog_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userauth` (`uID`),
  CONSTRAINT `loginlog_ibfk_2` FOREIGN KEY (`id`) REFERENCES `businessauth` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loginlog`
--

LOCK TABLES `loginlog` WRITE;
/*!40000 ALTER TABLE `loginlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `loginlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manner`
--

DROP TABLE IF EXISTS `manner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manner` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `recordID` char(8) COLLATE utf8_bin NOT NULL,
  `score` int DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `uID` (`uID`),
  KEY `recordID` (`recordID`),
  CONSTRAINT `manner_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`),
  CONSTRAINT `manner_ibfk_2` FOREIGN KEY (`recordID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manner`
--

LOCK TABLES `manner` WRITE;
/*!40000 ALTER TABLE `manner` DISABLE KEYS */;
/*!40000 ALTER TABLE `manner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `guard` tinyint(1) DEFAULT NULL,
  `center` tinyint(1) DEFAULT NULL,
  `forward` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  CONSTRAINT `position_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `winCnt` int NOT NULL,
  `loseCnt` int NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userauth`
--

DROP TABLE IF EXISTS `userauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userauth` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `birth` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userauth`
--

LOCK TABLES `userauth` WRITE;
/*!40000 ALTER TABLE `userauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `userauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofile` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `nickName` varchar(30) COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) COLLATE utf8_bin NOT NULL,
  `location` varchar(100) COLLATE utf8_bin NOT NULL,
  `height` int NOT NULL,
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-23 14:08:55
