-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 09, 2021 alle 16:43
-- Versione del server: 10.4.19-MariaDB
-- Versione PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stardust`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `cliente`
--

CREATE TABLE `cliente` (
  `id_client` int(100) NOT NULL,
  `name` varchar(15) NOT NULL,
  `surname` varchar(15) NOT NULL,
  `gender` char(2) NOT NULL,
  `cf` varchar(15) NOT NULL,
  `birthdate` date NOT NULL,
  `address` varchar(30) NOT NULL,
  `city` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `personal_document` varchar(20) NOT NULL,
  `cellphone_number` varchar(30) NOT NULL,
  `cvv2` int(3) NOT NULL,
  `code_cdc` int(20) NOT NULL,
  `expiration_date` date NOT NULL,
  `code_document` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `cliente`
--

INSERT INTO `cliente` (`id_client`, `name`, `surname`, `gender`, `cf`, `birthdate`, `address`, `city`, `region`, `personal_document`, `cellphone_number`, `cvv2`, `code_cdc`, `expiration_date`, `code_document`, `email`, `password`) VALUES
(1, 'Client', 'Patentato2', 'm', 'cf_prova', '1990-01-04', 'via topolino 43', 'Palermo', 'Sicilia', 'patente', '+393331122000', 176, 2147483647, '2022-03-24', 'abc123', 'client2@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(2, 'Client', 'Non Patentato', 'm', 'fhc28uend', '1990-01-04', 'via maqueda, 120', 'Palermo', 'Sicilia', 'carta identità', '+393331122000', 176, 2147483647, '2022-04-01', 'abc123', 'clientnp@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(4, 'Client', 'Patentato', 'm', '12345asdf', '1998-09-17', 'via maqueda, 120', 'Palermo', 'Sicilia', 'patente', '+393331122000', 123, 234567890, '2021-12-01', 'SDFGHJ567', 'client@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312');

-- --------------------------------------------------------

--
-- Struttura della tabella `corse`
--

CREATE TABLE `corse` (
  `id_ride` int(15) NOT NULL,
  `ref_pren` int(11) NOT NULL,
  `ref_client` int(15) NOT NULL,
  `ref_driver` int(15) DEFAULT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `impiegati`
--

CREATE TABLE `impiegati` (
  `id_impiegato` int(6) NOT NULL,
  `name` varchar(10) NOT NULL,
  `surname` varchar(10) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `birthdate` date NOT NULL,
  `address` varchar(30) NOT NULL,
  `cf` varchar(15) NOT NULL,
  `residence` varchar(20) NOT NULL,
  `cellphone_number` varchar(15) NOT NULL,
  `personal_document` varchar(20) NOT NULL,
  `code_document` varchar(40) NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `impiegati`
--

INSERT INTO `impiegati` (`id_impiegato`, `name`, `surname`, `gender`, `birthdate`, `address`, `cf`, `residence`, `cellphone_number`, `personal_document`, `code_document`, `role`, `email`, `password`) VALUES
(1, 'Admin', 'Admin', 'm', '2000-10-02', 'via napoleone n°43', 'abc123', 'Palermo', '+39336000000', 'patente', '471JNS', 'admin', 'admin@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(8, 'Driver', 'Primo', 'm', '1990-01-04', 'via topolino 43', 'abc123', 'Palermo', '+39336000000', 'patente', 'aunudb1773', 'driver', 'driver@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(9, 'Driver', 'Secondo', 'm', '1999-11-11', 'via 11', 'abc123', 'Palermo', '+39336000000', 'patente', 'jvnj2671', 'driver', 'driver2@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(10, 'Peter', 'Parker', 'm', '2000-11-11', 'via prova', 'abc123', 'Palermo', '+39336000000', 'patente', '123EJDN', 'parker', 'parker@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(12, 'Driver', 'Terzo', 'm', '1999-11-11', 'via 11', 'abc123', 'Palermo', '+39336000000', 'patente', 'jvnj2671', 'driver', 'driver3@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312'),
(13, 'Spider', 'Parker', 'm', '2000-11-11', 'via prova', 'abc123', 'Palermo', '+39336000000', 'patente', '123EJDN', 'parker', 'spider@gmail.com', '4bb458532786b4988e9287c1b799522809e6da88f1fc30c9184a640612662e238a8cb3e63cc9c22d903763e5114064ad89a468910dbd81f3b8045ba439479312');

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamenti`
--

CREATE TABLE `pagamenti` (
  `id_client` int(20) NOT NULL,
  `code_prenotation` int(20) NOT NULL,
  `code_cdc` varchar(20) NOT NULL,
  `price` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `code_prenotation` int(10) NOT NULL,
  `ref_client` int(11) NOT NULL,
  `primary_opt` varchar(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `start_address` varchar(30) NOT NULL,
  `end_address` varchar(30) NOT NULL,
  `vehicle_type` varchar(15) DEFAULT NULL,
  `ref_vehicle` varchar(15) DEFAULT NULL,
  `ref_driver` varchar(15) DEFAULT NULL,
  `price` float NOT NULL,
  `complete` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `stalli`
--

CREATE TABLE `stalli` (
  `id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `ref_vehicle` varchar(20) DEFAULT NULL,
  `type_vehicle` varchar(50) NOT NULL,
  `model_vehicle` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `stalli`
--

INSERT INTO `stalli` (`id`, `address`, `ref_vehicle`, `type_vehicle`, `model_vehicle`) VALUES
(1, 'Corso Calatafimi, 22', 'prova', 'Peugeot', '208'),
(2, 'Corso Calatafimi, 22', 'prv', 'Honda', 'CB125R'),
(3, 'Viale della Libertà, 28', 'suv_1', 'Tesla', 'Model 3'),
(12, 'Viale della Libertà, 28', 'abcdef', 'Renault', 'Zoe'),
(25, 'Viale della Libertà, 28', 'abcde', 'Dacia', 'Spring'),
(26, 'Via Ernesto Basile, 120', 'ebk1', 'Bultaco', 'Brinco S'),
(27, 'Via Ernesto Basile, 120', 'ebk2', 'Decathlon', 'Stilus E-ST'),
(28, 'Via Ernesto Basile, 120', 'ebk3', 'Porsche', 'eBike Cross'),
(29, 'Via Ernesto Basile, 120', 'ksks', 'Aprilia', 'eSR 2'),
(30, 'Corso dei Mille, 10', 'abc123', 'Dacia', 'Spring'),
(31, 'Corso dei Mille, 10', 'abc321', 'Renault', 'Zoe'),
(32, 'Corso dei Mille,10', 'mnptt1', 'Xiaomi', 'Mi Electric Scooter'),
(33, 'Via Oreto, 43', 'mnpttn', 'Aprilia', 'eSR 2'),
(34, 'Via Oreto, 43', 'prv1', 'Honda', 'CB125R'),
(35, 'Via Oreto, 43', 'SSTCM', 'Super Soco', 'TC Max'),
(36, 'Via Oreto, 43', 'SSTCM2', 'Super Soco', 'TC Max'),
(37, 'Corso dei Mille,10', 'zfxs', 'Zero', 'FXS');

-- --------------------------------------------------------

--
-- Struttura della tabella `veicoli`
--

CREATE TABLE `veicoli` (
  `id_vehicle` varchar(6) NOT NULL,
  `price` float NOT NULL,
  `type` varchar(10) NOT NULL,
  `model` varchar(40) NOT NULL,
  `licences_needed` tinyint(1) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `open` tinyint(1) NOT NULL,
  `ref_stallo` varchar(150) NOT NULL DEFAULT '',
  `image` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `veicoli`
--

INSERT INTO `veicoli` (`id_vehicle`, `price`, `type`, `model`, `licences_needed`, `description`, `open`, `ref_stallo`, `image`) VALUES
('abc123', 10, 'Dacia', 'Spring', 1, 'Accessibile, robusta e spaziosa. Nuova Dacia Spring 100% Elettrica è una city car che coniuga i codici del brand Dacia ai vantaggi di una motorizzazione 100% elettrica. Approfitta di una guida morbida e silenziosa per goderti un comfort esclusivo sia nei percorsi urbani sia nei tragitti extraurbani.', 0, 'Corso dei Mille, 10', 'https://www.giacobbeautomobili.com/wp-content/uploads/2021/03/Dacia-Spring-Bianco-Kaolin-6.jpeg'),
('abc321', 12, 'Renault', 'Zoe', 1, 'A bordo di Zoe E-Tech electric, usufruisci di numerosi servizi connessi accessibili dal sistema multimediale EASY LINK o attraverso l’app MY Renault. Potrai, ad esempio, eseguire il precondizionamento dell\'abitacolo di Zoe o pianificare la ricarica e i tragitti.', 0, 'Corso dei Mille, 10', 'https://www.motorionline.com/wp-content/uploads/2019/07/Auto-elettriche-per-donne-i-10-modelli-migliori-da-comprare_01.jpg'),
('abcde', 10, 'Dacia', 'Spring', 1, 'Accessibile, robusta e spaziosa. Nuova Dacia Spring 100% Elettrica è una city car che coniuga i codici del brand Dacia ai vantaggi di una motorizzazione 100% elettrica. Approfitta di una guida morbida e silenziosa per goderti un comfort esclusivo sia nei percorsi urbani sia nei tragitti extraurbani.', 0, 'Viale della Libertà, 28', 'https://www.giacobbeautomobili.com/wp-content/uploads/2021/03/Dacia-Spring-Bianco-Kaolin-6.jpeg'),
('abcdef', 12, 'Renault', 'Zoe', 1, 'A bordo di Zoe E-Tech electric, usufruisci di numerosi servizi connessi accessibili dal sistema multimediale EASY LINK o attraverso l’app MY Renault. Potrai, ad esempio, eseguire il precondizionamento dell\'abitacolo di Zoe o pianificare la ricarica e i tragitti.', 0, 'Viale della Libertà, 28', 'https://www.motorionline.com/wp-content/uploads/2019/07/Auto-elettriche-per-donne-i-10-modelli-migliori-da-comprare_01.jpg'),
('ebk1', 8, 'Bultaco', 'Brinco S', 0, 'Progettato per ambienti urbani, è il modello Brinco più comodo, grazie alla sua bassa altezza del sedile, al manubrio per tour e al sedile orientato alla comodità. Brividi come mai prima: spinta umana-elettrica. Motore elettrico al 100% e sistema a pedali indipendente.', 0, 'Via Ernesto Basile, 120', 'https://www.motociclismo.it/files/articoli/6/0/7/60744/bultaco-brinco-bicicletta-elettrica-con-prestazioni-da-moto_1.jpg'),
('ebk2', 8, 'Decathlon', 'Stilus E-ST', 0, 'Questa MTB a pedalata assistita è ideata per le escursioni in MTB in montagna.  Divertiti con la MTB a pedalata assistita STILUS ST: grazie al telaio full suspended andrai più lontano e con più comfort.', 0, 'Via Ernesto Basile, 120', 'https://contents.mediadecathlon.com/p2094399/k$e75ab76eecad855dd8f54d02fd69ef1d/sq/mtb-elettrica-a-pedalata-assistita-stilus-e-st-29.jpg?format=auto&f=720x720'),
('ebk3', 10, 'Porsche', 'eBike Cross', 0, 'E-bike sportiva ed elegante di Porsche, realizzata in collaborazione con ROTWILD. Con potente motore Shimano e supporto Pedelec fino a 25 km/h. La compagna di viaggio ideale per terreni facili e percorsi fuoristrada.', 0, 'Via Ernesto Basile, 120', 'https://d9w5i958y8lo6.cloudfront.net/media/IMG-P-WAP061EBS0M00-01-1920Wx2160H?context=bWFzdGVyfGFzc2V0c3w1NTc2OTZ8aW1hZ2UvanBlZ3xhc3NldHMvaGI4L2hjOS85MDgyOTAzMjY1MzEwLmpwZ3w4YTQ3ZjEzMjRkNTJkY2Y3NDNjNjQyMjNjMGYyYzA2OTM5MTEwY2RlZDM3ZDNjMmM0OTNlNzNkYTZjZjg5MmM4'),
('ksks', 5, 'Aprilia', 'eSR2', 0, 'eSR2 è il monopattino elettrico dall’animo sportivo pensato per chi vuole sentirsi sempre pronto alle sfide in città, grazie al supporto offerto dalla doppia sospensione anteriore e dalla connessione all’App integrata, che permette di tenere sempre sotto controllo le prestazioni ed accedere ai servizi di assistenza tecnica in tempo reale.', 0, 'Via Ernesto Basile, 120', 'https://static1.unieuro.it/medias/sys_master/root/h91/h85/32954612285470/-api-rest-00ed29448a7522f610cac04d7b9ea7e0-assets-691ac89e6ff91501c75a8027fa6b24b7-preview-sgmConversionBaseFormat.jpg'),
('mnptt1', 5, 'Xiaomi', 'Mi Electric Scooter', 0, 'Elegante e dal design minimale, portatile e sicuro; linee pulite e ricercate, scocca principale in lega di alluminio di tipo aerospaziale, si piega in appena 3 secondi Mi Electric Scooter 1S è un modello intermedio, pensato da Xiaomi per i rider meno esigenti, che percorrono tragitti piu’ corti; l’ottima qualità delle batterie offre un’autonomia di guida fino a 30 Km', 0, 'Corso dei Mille,10', 'https://www.filmatech.it/225-large_default/monopattino-elettrico-xiaomi-mi-electric-scooter.jpg'),
('mnpttn', 5, 'Aprilia', 'eSR2', 0, 'eSR2 è il monopattino elettrico dall’animo sportivo pensato per chi vuole sentirsi sempre pronto alle sfide in città, grazie al supporto offerto dalla doppia sospensione anteriore e dalla connessione all’App integrata, che permette di tenere sempre sotto controllo le prestazioni ed accedere ai servizi di assistenza tecnica in tempo reale.', 0, 'Via Oreto, 43', 'https://static1.unieuro.it/medias/sys_master/root/h91/h85/32954612285470/-api-rest-00ed29448a7522f610cac04d7b9ea7e0-assets-691ac89e6ff91501c75a8027fa6b24b7-preview-sgmConversionBaseFormat.jpg'),
('prova', 15, 'Peugeot', '208', 1, 'Il suo powertrain elettrico permette di muoversi senza eccessiva “ansia da ricarica” e grazie alla buona messa a punto del telaio, permette di togliersi non poche soddisfazioni quando si esce dalla città per affrontare qualche strada tutta curve.', 0, 'Corso Calatafimi, 22', 'https://citynews-cataniatoday.stgy.ovh/~media/original-hi/7017311256308/dfcce77a31b8ff5c02701f85cf761606-2.jpg'),
('prv', 15, 'Honda', 'CB125R', 1, 'La CB125R regala prestazioni grintose racchiuse in una silhouette elegante, offrendo un\'esperienza di guida entusiasmante per tutti i motociclisti.Un quadro strumenti LCD di ultima generazione e l\'illuminazione full LED sono dotazioni premium della nuova CB125R, ma quello che attirerà davvero la tua attenzione sono la potenza extra del nuovo motore DOHC da 125cc.', 0, 'Corso Calatafimi, 22', 'https://www.honda.it/content/dam/central/motorcycles/colour-picker/street/cb125r/cb125r_2021/nh-436m_mat_gunpowder_black_metallic/21YM_CB125R_Mat_Gunpowder_Black_Metallic_RHS_ORIGINAL.png/_jcr_content/renditions/c4.png'),
('prv1', 15, 'Honda', 'CB125R', 1, 'La CB125R regala prestazioni grintose racchiuse in una silhouette elegante, offrendo un\'esperienza di guida entusiasmante per tutti i motociclisti.Un quadro strumenti LCD di ultima generazione e l\'illuminazione full LED sono dotazioni premium della nuova CB125R, ma quello che attirerà davvero la tua attenzione sono la potenza extra del nuovo motore DOHC da 125cc.', 0, 'Via Oreto, 43', 'https://www.honda.it/content/dam/central/motorcycles/colour-picker/street/cb125r/cb125r_2021/nh-436m_mat_gunpowder_black_metallic/21YM_CB125R_Mat_Gunpowder_Black_Metallic_RHS_ORIGINAL.png/_jcr_content/renditions/c4.png'),
('SSTCM', 13, 'Super Soco', 'TC Max', 1, 'Una moto elettrica estremamente divertente e agile, con classici elementi da café racer. Il suo DNA è però 100% elettrico, con un motore che eroga 5.000W di potenza di picco e 180 Nm di coppia (sempre di picco), con un tasso di conversione dell\'energia pari al 93%.', 0, 'Via Oreto, 43', 'https://www.motociclismo.it/files/galleries/1/7/3/17366/B_691ca3056bdfe931f327e07a303d07cc.jpg'),
('SSTCM2', 13, 'Super Soco', 'TC Max', 1, 'Una moto elettrica estremamente divertente e agile, con classici elementi da café racer. Il suo DNA è però 100% elettrico, con un motore che eroga 5.000W di potenza di picco e 180 Nm di coppia (sempre di picco), con un tasso di conversione dell\'energia pari al 93%.', 0, 'Via Oreto, 43', 'https://www.motociclismo.it/files/galleries/1/7/3/17366/B_691ca3056bdfe931f327e07a303d07cc.jpg'),
('suv_1', 23, 'Tesla', 'Model 3', 1, 'La sicurezza è l\'elemento più importante del design complessivo di Model 3. La struttura metallica è una combinazione di alluminio e acciaio per garantire la massima resistenza in ogni area del veicolo. In un crash-test del tetto, Model 3 ha resistito a impatti quattro volte superiori alla sua massa, anche in caso di tetto integralmente in vetro; in altri termini, ha resistito al peso di due elefanti africani adulti.', 0, 'Viale della Libertà, 28', 'https://auto.hwupgrade.it/immagini/model3_2021_720.jpg'),
('zfxs', 8, 'Zero', 'FXS', 1, 'Se cercate una moto elettrica da strada che sia estremamente agile nel traffico e divertente da guidare, probabilmente la Zero FXS ha poche rivali. Ha un\'autonomia nel ciclo urbano di ben 161 km, il suo peso complessivo inoltre non va oltre i 133 kg, mentre la velocità massima è pari a 132 km/h.', 0, 'Corso dei Mille,10', 'https://www.electrocycles.it/wp-content/uploads/2017/07/01-zero-fxs-electric-motorcycle-black1-1.jpg');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_client`);

--
-- Indici per le tabelle `corse`
--
ALTER TABLE `corse`
  ADD PRIMARY KEY (`id_ride`);

--
-- Indici per le tabelle `impiegati`
--
ALTER TABLE `impiegati`
  ADD PRIMARY KEY (`id_impiegato`);

--
-- Indici per le tabelle `pagamenti`
--
ALTER TABLE `pagamenti`
  ADD PRIMARY KEY (`id_client`,`code_prenotation`),
  ADD KEY `code_prenotation` (`code_prenotation`);

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`code_prenotation`),
  ADD KEY `foreignkey` (`ref_vehicle`);

--
-- Indici per le tabelle `stalli`
--
ALTER TABLE `stalli`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_vehicle` (`ref_vehicle`);

--
-- Indici per le tabelle `veicoli`
--
ALTER TABLE `veicoli`
  ADD PRIMARY KEY (`id_vehicle`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_client` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `corse`
--
ALTER TABLE `corse`
  MODIFY `id_ride` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT per la tabella `impiegati`
--
ALTER TABLE `impiegati`
  MODIFY `id_impiegato` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `code_prenotation` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT per la tabella `stalli`
--
ALTER TABLE `stalli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `pagamenti`
--
ALTER TABLE `pagamenti`
  ADD CONSTRAINT `pagamenti_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `cliente` (`id_client`),
  ADD CONSTRAINT `pagamenti_ibfk_2` FOREIGN KEY (`code_prenotation`) REFERENCES `prenotazioni` (`code_prenotation`);

--
-- Limiti per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `foreignkey` FOREIGN KEY (`ref_vehicle`) REFERENCES `veicoli` (`id_vehicle`);

--
-- Limiti per la tabella `stalli`
--
ALTER TABLE `stalli`
  ADD CONSTRAINT `stalli_ibfk_1` FOREIGN KEY (`ref_vehicle`) REFERENCES `veicoli` (`id_vehicle`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
