create database if not exists dispensen;
use dispensen;

create table login(
                      loginID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                      username varchar(50),
                      pwd varchar(50)
);

INSERT INTO login (loginID,username, pwd) VALUES
                                              (1,'User1', 'Pass1'),
                                              (2,'User2', 'Pass2'),
                                              (3,'User3', 'Pass3');
INSERT INTO login (loginID, username, pwd) VALUES
                                               (4, 'User4', 'Pass4'),
                                               (5, 'User5', 'Pass5'),
                                               (6, 'User6', 'Pass6'),
                                               (7, 'User7', 'Pass7'),
                                               (8, 'User8', 'Pass8');
create table if not exists locations(
                                        locationID integer primary key not null auto_increment,
                                        location varchar(50)
);

INSERT INTO locations (locationID, location) VALUES
                                                 (1,'Horgen'),
                                                 (2,'Stäfa'),
                                                 (3,'Horgen Oberdorf');

create table if not exists gender(
                                     genderID integer primary key not null auto_increment,
                                     gender varchar(50),
                                     abrev varchar(3)
);

INSERT INTO gender (genderID,gender, abrev) VALUES
                                                (1,'Männlich', 'M'),
                                                (2,'Weiblich', 'W'),
                                                (3,'Divers', 'D');

create table if not exists user(
                                   userID integer primary key not null auto_increment,
                                   loginID int,
                                   foreign key (loginID) references login(loginID),
                                   locationID int,
                                   foreign key (locationID) references locations(locationID),
                                   name varchar(50),
                                   surname varchar(50),
                                   genderID int,
                                   foreign key (genderID) references gender(genderID),
                                   email varchar(50),
                                   mobile varchar(50),
                                   class varchar(50)
);

INSERT INTO user (userID, loginID, locationID, name, surname, genderID, email, mobile, class) VALUES
                                                                                                  (1,1, 1, 'Anna', 'Müller', 1, 'anna.mueller@example.com', '+41 79 123 45 67', 'A1'),
                                                                                                  (2,2, 2, 'Max', 'Schmidt', 1, 'max.schmidt@example.com', '+41 76 987 65 43', 'B2'),
                                                                                                  (3,3, 3, 'Sophie', 'Wagner', 2, 'sophie.wagner@example.com', '+41 78 555 12 34', 'C3'),
                                                                                                  (4,4, 1, 'David', 'Koch', 1, 'david.koch@example.com', '+41 79 111 22 33', 'A1'),
                                                                                                  (5,5, 2, 'Lena', 'Hoffmann', 2, 'lena.hoffmann@example.com', '+41 76 777 88 99', 'B2'),
                                                                                                  (6,6, 3, 'Felix', 'Bauer', 1, 'felix.bauer@example.com', '+41 79 444 55 66', 'C3'),
                                                                                                  (7,7, 1, 'Laura', 'Schneider', 2, 'laura.schneider@example.com', '+41 78 999 88 77', 'A1'),
                                                                                                  (8,8, 2, 'Tim', 'Weber', 1, 'tim.weber@example.com', '+41 76 333 22 11', 'B2');


create table if not exists reason(
                                     reasonID integer primary key not null auto_increment,
                                     reason varchar(50),
                                     reason_kurz varchar(50)
);

INSERT INTO reason (reason, reason_kurz) VALUES
                                             ('Medizinische Notwendigkeit', 'Med. Notw.'),
                                             ('Ausnahmen im Kirchenrecht', 'Kirchenr.'),
                                             ('Verwaltungsrechtliche Ausnahmen', 'Verwalt.'),
                                             ('Fehlerkorrekturen', 'Fehlerkorr.');



create table if not exists jobs(
                                   jobID integer primary key not null auto_increment,
                                   job varchar(50)
);

insert into jobs (job) values
                           ('Mediamatiker'),
                           ('Informatiker'),
                           ('FaBe'),
                           ('FaGe');

create table if not exists lessions(
                                       lessionID integer primary key not null auto_increment,
                                       lession integer
);

INSERT INTO `lessions` (`lession`) VALUES
                                       (1),
                                       (2),
                                       (3),
                                       (4),
                                       (5),
                                       (6),
                                       (7),
                                       (8),
                                       (9),
                                       (10);


create table if not exists files(
                                    fileID integer primary key not null auto_increment,
                                    file varchar(50)
);

INSERT INTO `files` (`file`) VALUES
                                 ('file1.txt'),
                                 ('file2.docx'),
                                 ('file3.jpg'),
                                 ('file4.pdf'),
                                 ('file5.xlsx'),
                                 ('file6.png'),
                                 ('file7.ppt'),
                                 ('file8.csv'),
                                 ('file9.zip'),
                                 ('file10.log');


CREATE TABLE if not exists dispens(
                                      dispensationID INT PRIMARY KEY not null auto_increment,
                                      userID INT,
                                      start_date DATE,
                                      end_date DATE,
                                      jobID INT,
                                      lessionID INT,
                                      teachers VARCHAR(255),
                                      work_check BOOLEAN,
                                      comment TEXT,
                                      fileID INT,
                                      reasonID int,
                                      FOREIGN KEY (reasonID) REFERENCES reason(reasonID),
                                      FOREIGN KEY (userID) REFERENCES User(userID),
                                      FOREIGN KEY (jobID) REFERENCES Jobs(jobID),
                                      FOREIGN KEY (lessionID) REFERENCES lessions(lessionID),
                                      FOREIGN KEY (fileID) REFERENCES Files(fileID)
);
INSERT INTO `dispens` (`userID`, `start_date`, `end_date`, `jobID`, `lessionID`, `teachers`, `work_check`, `comment`, `fileID`, `reasonID`)
VALUES
    (1, '2023-12-01', '2023-12-05', 1, 1, 'Mr. Smith', TRUE, 'Genehmigt', 1, 1),
    (2, '2023-12-03', '2023-12-07', 2, 2, 'Frau Johnson', FALSE, 'Bedarf weiterer Prüfung', 2, 2),
    (3, '2023-12-02', '2023-12-06', 3, 3, 'Dr. Müller', TRUE, 'Abgeschlossen', 3, 3),
    (4, '2023-12-04', '2023-12-08', 1, 4, 'Frau Lee', TRUE, 'Bestätigt', 4, 4),
    (5, '2023-12-05', '2023-12-09', 2, 5, 'Herr Kim', FALSE, 'In Bearbeitung', 5, 1),
    (6, '2023-12-06', '2023-12-10', 3, 6, 'Frau Garcia', TRUE, 'Erledigt', 6, 2),
    (7, '2023-12-07', '2023-12-11', 1, 7, 'Dr. Patel', FALSE, 'Zurückgestellt', 7, 3),
    (8, '2023-12-08', '2023-12-12', 2, 8, 'Herr Wang', TRUE, 'Genehmigt', 8, 4);

SELECT user FROM mysql.user;


CREATE USER  'dispensAdmin'@'localhost' IDENTIFIED BY'dispensAdminPW';
ALTER USER 'dispensAdmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dispensAdminPW';
GRANT all privileges ON dispensen.* TO 'dispensAdmin'@'localhost';
FLUSH PRIVILEGES;

SELECT user,host FROM mysql.user;
SHOW GRANTS FOR dispensAdmin@localhost;





-- ---------------------------------------------------------------------------------------------------------------------
-- 1. Für die neue DB-Instanz müssen wir einige DB-Umgebungsparameter setzten
-- ---------------------------------------------------------------------------------------------------------------------
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
