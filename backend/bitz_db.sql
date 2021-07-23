CREATE TABLE `businessauth` (
  `bID` char(8) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `birth` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`bID`),
  UNIQUE KEY `bID_UNIQUE` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

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

CREATE TABLE `loginlog` (
  `id` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `loginlog_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userauth` (`uID`),
  CONSTRAINT `loginlog_ibfk_2` FOREIGN KEY (`id`) REFERENCES `businessauth` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

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

CREATE TABLE `position` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `guard` tinyint(1) DEFAULT NULL,
  `center` tinyint(1) DEFAULT NULL,
  `forward` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  CONSTRAINT `position_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `skill` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `winCnt` int NOT NULL,
  `loseCnt` int NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`),
  CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `userauth` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `userauth` (
  `uID` char(8) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `birth` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `uID_UNIQUE` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

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
