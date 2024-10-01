-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pbackend_api
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Mercado','2024-09-27 05:53:52','2024-09-27 05:53:52');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fondos`
--

DROP TABLE IF EXISTS `fondos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fondos` (
  `idfondo` int NOT NULL AUTO_INCREMENT,
  `origen` int NOT NULL,
  `moneda` int NOT NULL,
  `monto_moneda_base` float NOT NULL,
  `monto_moneda_referencia` float NOT NULL,
  `fecha` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idfondo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fondos`
--

LOCK TABLES `fondos` WRITE;
/*!40000 ALTER TABLE `fondos` DISABLE KEYS */;
/*!40000 ALTER TABLE `fondos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medios_de_pago`
--

DROP TABLE IF EXISTS `medios_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medios_de_pago` (
  `idmediopago` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idmediopago`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medios_de_pago`
--

LOCK TABLES `medios_de_pago` WRITE;
/*!40000 ALTER TABLE `medios_de_pago` DISABLE KEYS */;
INSERT INTO `medios_de_pago` VALUES (1,'Transferencia Mercado Pago','2024-09-15 03:45:26','2024-09-15 03:46:33'),(2,'Efectivo','2024-09-15 03:45:33','2024-09-15 03:45:33'),(3,'Debito Galicia','2024-09-15 03:45:38','2024-09-15 03:45:38'),(4,'Debito Mercado Pago','2024-09-15 03:46:16','2024-09-15 03:46:16'),(5,'QR Mercado Pago','2024-09-15 03:46:40','2024-09-15 03:46:40'),(6,'Transferencia Galicia','2024-09-15 03:46:55','2024-09-15 03:46:55');
/*!40000 ALTER TABLE `medios_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos` (
  `idmovimiento` int NOT NULL AUTO_INCREMENT,
  `fecha_hora` datetime NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `idtipo` int NOT NULL,
  `idcategoria` int NOT NULL,
  `idusuario` int NOT NULL,
  `idmediopago` int NOT NULL,
  `monto` float NOT NULL,
  `idpago` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idmovimiento`),
  KEY `idcategoria` (`idcategoria`),
  KEY `idusuario` (`idusuario`),
  KEY `idmediopago` (`idmediopago`),
  KEY `idpago` (`idpago`),
  CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`idcategoria`),
  CONSTRAINT `movimientos_ibfk_2` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `movimientos_ibfk_3` FOREIGN KEY (`idmediopago`) REFERENCES `medios_de_pago` (`idmediopago`),
  CONSTRAINT `movimientos_ibfk_4` FOREIGN KEY (`idpago`) REFERENCES `pagos` (`idpago`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos`
--

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
INSERT INTO `movimientos` VALUES (107,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,81,'2024-09-29 03:13:44','2024-09-29 03:13:44'),(116,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,86,'2024-09-29 04:14:17','2024-09-29 04:14:17'),(117,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,87,'2024-09-29 04:14:18','2024-09-29 04:14:18'),(118,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,88,'2024-09-29 04:14:18','2024-09-29 04:14:18'),(119,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,89,'2024-09-29 04:14:19','2024-09-29 04:14:19'),(120,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,90,'2024-09-29 04:14:19','2024-09-29 04:14:19'),(121,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,91,'2024-09-29 04:14:20','2024-09-29 04:14:20'),(122,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,92,'2024-09-29 04:15:05','2024-09-29 04:15:05'),(123,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,93,'2024-09-29 04:15:06','2024-09-29 04:15:06'),(124,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,94,'2024-09-29 04:15:07','2024-09-29 04:15:07'),(125,'2024-09-20 15:30:00','Pago por servicios',1,1,6,4,150.75,95,'2024-09-29 04:15:07','2024-09-29 04:15:07');
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origenes`
--

DROP TABLE IF EXISTS `origenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origenes` (
  `idorigen` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idorigen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
/*!40000 ALTER TABLE `origenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `origenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `idpago` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `idmediopago` int NOT NULL,
  `idcategoria` int NOT NULL,
  `adjunto` varchar(255) DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idpago`),
  KEY `idusuario` (`idusuario`),
  KEY `idmediopago` (`idmediopago`),
  KEY `idcategoria` (`idcategoria`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idmediopago`) REFERENCES `medios_de_pago` (`idmediopago`),
  CONSTRAINT `pagos_ibfk_3` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (81,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 03:13:44','2024-09-29 03:13:44'),(86,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:14:17','2024-09-29 04:14:17'),(87,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:14:18','2024-09-29 04:14:18'),(88,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:14:18','2024-09-29 04:14:18'),(89,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:14:19','2024-09-29 04:14:19'),(90,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:14:19','2024-09-29 04:14:19'),(91,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:14:20','2024-09-29 04:14:20'),(92,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:15:05','2024-09-29 04:15:05'),(93,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:15:06','2024-09-29 04:15:06'),(94,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:15:07','2024-09-29 04:15:07'),(95,6,'Pago por servicios',150.75,4,1,'uploads/pago_2024_09_20_12_30_00.pdf','2024-09-20 15:30:00','2024-09-29 04:15:07','2024-09-29 04:15:07');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (6,'granjero','$2a$10$vvQEu0qf/C3nYDOVl4wcY.miQDpyS62FZ7e62Bj/JuKfaNXeSHUfa','jero','huincaman','2024-09-21 02:03:59','2024-09-21 02:03:59'),(139,'supergranjero','$2a$10$ZBKjaJMrnV8oj9I8WpmFyee8RWxM9Ml6e3f5SM2NYKKrV5gxwkDsS','supergranjero','huincaman','2024-09-29 04:06:50','2024-09-29 04:06:50');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-30 21:56:44
