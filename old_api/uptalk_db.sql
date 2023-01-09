-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 13 juin 2022 à 22:10
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `uptalk_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `user_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`user_id`, `contact_id`) VALUES
(1, 4),
(4, 1),
(1, 4),
(4, 1),
(1, 4),
(4, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `interet`
--

CREATE TABLE `interet` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `interet`
--

INSERT INTO `interet` (`id`, `name`) VALUES
(9, 'Alcool'),
(3, 'foot'),
(6, 'Jeux Vidéos'),
(5, 'League of Legends'),
(7, 'Minecraft'),
(4, 'netflix'),
(8, 'Soirées'),
(1, 'sport');

-- --------------------------------------------------------

--
-- Structure de la table `interet_relation`
--

CREATE TABLE `interet_relation` (
  `user_id` int(11) NOT NULL,
  `interet_id` int(11) DEFAULT NULL,
  `nb` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `interet_relation`
--

INSERT INTO `interet_relation` (`user_id`, `interet_id`, `nb`) VALUES
(1, 6, 1),
(1, 5, 2),
(1, 7, 3),
(1, 4, 4),
(1, 8, 5),
(2, NULL, 1),
(2, NULL, 2),
(2, NULL, 3),
(2, NULL, 4),
(2, NULL, 5),
(3, NULL, 1),
(3, NULL, 2),
(3, NULL, 3),
(3, NULL, 4),
(3, NULL, 5),
(4, 3, 1),
(4, 6, 2),
(4, 7, 3),
(4, 4, 4),
(4, 4, 5);

-- --------------------------------------------------------

--
-- Structure de la table `liked`
--

CREATE TABLE `liked` (
  `user_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `liked`
--

INSERT INTO `liked` (`user_id`, `target_id`, `type`) VALUES
(4, 1, 'like'),
(4, 2, 'like'),
(4, 3, 'like'),
(1, 2, 'like'),
(1, 3, 'like'),
(1, 4, 'like');

-- --------------------------------------------------------

--
-- Structure de la table `localisation`
--

CREATE TABLE `localisation` (
  `user_id` int(11) NOT NULL,
  `longitude` float DEFAULT NULL,
  `lattitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `localisation`
--

INSERT INTO `localisation` (`user_id`, `longitude`, `lattitude`) VALUES
(1, NULL, NULL),
(2, 48.6903, 2.29694),
(3, 48.9698, 2.28292),
(4, 48.7894, 2.28696),
(5, 48.991, 2.19187),
(6, NULL, NULL),
(7, NULL, NULL),
(8, NULL, NULL),
(9, NULL, NULL),
(10, NULL, NULL),
(11, NULL, NULL),
(12, NULL, NULL),
(13, NULL, NULL),
(14, NULL, NULL),
(15, NULL, NULL),
(16, NULL, NULL),
(17, NULL, NULL),
(18, NULL, NULL),
(19, NULL, NULL),
(20, NULL, NULL),
(21, NULL, NULL),
(22, NULL, NULL),
(23, NULL, NULL),
(24, NULL, NULL),
(25, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `user_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `message_value` text NOT NULL,
  `message_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`user_id`, `target_id`, `message_value`, `message_time`) VALUES
(1, 2, 'tdxtz', '2022-06-08 00:00:00'),
(1, 4, 'test', '2022-06-08 21:18:46'),
(1, 4, 'test', '2022-06-08 21:26:55'),
(1, 4, 'test', '2022-06-08 21:29:13'),
(1, 4, 'test', '2022-06-08 21:29:37'),
(1, 4, 'ceci est un message', '2022-06-08 21:30:33'),
(1, 2, 'test', '2022-06-08 22:24:54'),
(1, 2, 'test', '2022-06-08 22:24:56'),
(1, 4, 'kk', '2022-06-09 09:38:24'),
(1, 4, 'test', '2022-06-09 09:38:49'),
(1, 0, 'test', '2022-06-09 09:47:25'),
(1, 2, 'test', '2022-06-09 10:00:23'),
(1, 2, 'de', '2022-06-09 10:01:13'),
(1, 4, 'test', '2022-06-09 11:01:56'),
(1, 3, 'test', '2022-06-09 11:49:02'),
(1, 2, 'test', '2022-06-09 13:58:59'),
(4, 1, 'test', '2022-06-09 14:06:04'),
(1, 4, 'test', '2022-06-09 14:33:48'),
(4, 1, 'test', '2022-06-09 14:38:15'),
(1, 4, 'test', '2022-06-09 14:38:51'),
(4, 1, 'msg', '2022-06-09 15:25:29'),
(4, 1, 'test', '2022-06-09 15:28:48'),
(4, 1, 'message', '2022-06-09 15:29:06'),
(4, 1, 'test', '2022-06-09 15:29:25'),
(4, 1, 'msg', '2022-06-09 15:29:48'),
(4, 1, 'gg', '2022-06-09 15:38:38'),
(1, 4, 'hehe', '2022-06-09 15:38:45'),
(4, 1, 'test', '2022-06-09 15:39:08'),
(4, 1, 'nn', '2022-06-09 15:42:51'),
(4, 1, 'test', '2022-06-09 15:45:03'),
(4, 1, 'vr', '2022-06-09 15:45:54'),
(4, 1, 'vv', '2022-06-09 15:46:09'),
(4, 1, 'mm', '2022-06-09 15:46:15'),
(4, 1, 'gg', '2022-06-09 15:48:03'),
(4, 1, 'hh', '2022-06-09 15:49:25'),
(4, 1, 'vr', '2022-06-09 15:50:17'),
(4, 1, 'hh', '2022-06-09 15:50:29'),
(1, 2, 'hh', '2022-06-09 15:50:37'),
(4, 1, 'tt', '2022-06-09 15:54:05'),
(4, 1, 'ff', '2022-06-09 15:54:57'),
(4, 1, 'ff', '2022-06-09 15:55:02'),
(4, 1, 'gg', '2022-06-09 15:55:29'),
(4, 1, 'gg', '2022-06-09 15:55:30'),
(4, 1, 'g', '2022-06-09 15:55:36'),
(1, 2, 'gg', '2022-06-09 15:55:43'),
(4, 1, 'hh', '2022-06-09 15:56:18'),
(4, 1, 'hh', '2022-06-09 15:56:19'),
(4, 1, 'h', '2022-06-09 15:56:20'),
(4, 1, '', '2022-06-09 15:56:20'),
(4, 1, 'hh', '2022-06-09 15:56:37'),
(4, 1, 'ùm', '2022-06-09 15:56:39'),
(4, 1, 'jj', '2022-06-09 15:57:08'),
(4, 1, '12', '2022-06-09 16:02:55'),
(4, 1, 'jj', '2022-06-09 16:03:55'),
(1, 4, 'jj', '2022-06-09 16:04:01'),
(4, 1, 'hh', '2022-06-09 16:05:19'),
(4, 1, 'hh', '2022-06-09 16:05:21'),
(4, 1, 'vv', '2022-06-09 16:06:28'),
(4, 1, 'jj', '2022-06-09 16:07:04'),
(1, 4, 'uu', '2022-06-09 16:07:35'),
(4, 1, 'rr', '2022-06-09 16:11:08'),
(4, 1, 'bb', '2022-06-09 16:15:20'),
(4, 1, 'jj', '2022-06-09 16:16:21'),
(4, 1, 'uu', '2022-06-09 16:16:31'),
(1, 2, 'tt', '2022-06-09 16:17:33'),
(1, 4, 'rr', '2022-06-09 16:18:01'),
(4, 1, 'rr', '2022-06-09 16:18:04'),
(4, 1, 'rr', '2022-06-09 16:18:11'),
(1, 3, 'rr', '2022-06-09 16:18:15'),
(4, 1, 'rr', '2022-06-09 16:23:31'),
(4, 1, 'gg', '2022-06-09 16:24:08'),
(4, 1, 'gg', '2022-06-09 16:24:11'),
(4, 1, 'hh', '2022-06-09 16:25:59'),
(4, 1, 'kk', '2022-06-09 16:26:09'),
(1, 4, 'test', '2022-06-09 18:09:42'),
(1, 4, 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2022-06-10 14:03:16'),
(1, 4, 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2022-06-10 14:03:25'),
(1, 4, 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2022-06-10 14:03:30'),
(1, 2, 'Timothy je sais pas ce que tu fais mais tu pues <3 ', '2022-06-10 15:03:23'),
(1, 4, 'bonsoir je suce pour 5$ ou gratuit si vous etes beau cliquez sur ce lien afin de mettre votre carte bleu : https//tractformelenchon.com ', '2022-06-10 16:14:06');

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

CREATE TABLE `profile` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `gender` varchar(25) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `profile`
--

INSERT INTO `profile` (`user_id`, `firstname`, `lastname`, `gender`, `birthday`, `bio`) VALUES
(1, 'Damien', 'Drozd', 'Male', '2001-09-07', 'Bio de Damien'),
(2, 'Timothy', 'Wu', 'Male', NULL, NULL),
(3, 'Benjamin', 'Boisson', 'Female', NULL, NULL),
(4, 'Judith', 'Dubreuil ', 'Female', '2000-06-11', 'Biogarphie de Judith');

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id`, `name`) VALUES
(1, 'Si vous devez vous décrire avec trois objets, lesquels seront-ils ?'),
(3, 'Selon vous, qu\'elle est la chose essentielle dans une relation durable?'),
(4, 'Quelle est la caractéristique qui vous attire le plus chez votre partenaire ?'),
(5, 'Quelle est la chose a propos de vous dont votre partenaire doit absolument savoir avant même de discuter avec vous ?');

-- --------------------------------------------------------

--
-- Structure de la table `question_relation`
--

CREATE TABLE `question_relation` (
  `user_id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `reponse` text DEFAULT NULL,
  `nb` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `question_relation`
--

INSERT INTO `question_relation` (`user_id`, `question_id`, `reponse`, `nb`) VALUES
(1, 1, 'test1', 1),
(1, 3, 'test2', 2),
(1, 4, 'test3', 3),
(2, NULL, NULL, 1),
(2, NULL, NULL, 2),
(2, NULL, NULL, 3),
(3, NULL, NULL, 1),
(3, NULL, NULL, 2),
(3, NULL, NULL, 3),
(4, 3, 'test1', 1),
(4, 4, 'eqdezd', 2),
(4, 5, 'dqzdzd', 3);

-- --------------------------------------------------------

--
-- Structure de la table `recherche`
--

CREATE TABLE `recherche` (
  `user_id` int(11) NOT NULL,
  `preference_gender` varchar(25) DEFAULT NULL,
  `zone_recherche` int(11) DEFAULT NULL,
  `age_min` int(11) DEFAULT NULL,
  `age_max` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `recherche`
--

INSERT INTO `recherche` (`user_id`, `preference_gender`, `zone_recherche`, `age_min`, `age_max`) VALUES
(1, NULL, NULL, NULL, NULL),
(2, 'bi', 40, 20, 50),
(3, 'bi', 40, 18, 50),
(4, 'bi', 40, 18, 50),
(5, 'bi', 50, 18, 50),
(6, NULL, NULL, NULL, NULL),
(7, NULL, NULL, NULL, NULL),
(8, NULL, NULL, NULL, NULL),
(9, NULL, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL),
(15, NULL, NULL, NULL, NULL),
(16, NULL, NULL, NULL, NULL),
(17, NULL, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL),
(23, NULL, NULL, NULL, NULL),
(24, NULL, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`) VALUES
(1, 'damien@drozd', '$2b$10$iR/6kxl3dgi9A9omwWykFue/JxUCPqd.T5y0ohZgscyUd9QxHbHn2'),
(2, 'timothy@wu', '$2b$10$Y45q5HifOZf1rL99EVXBf.adj8kHM1DJPDHChuXJc6v0/V.zMLXFe'),
(3, 'benjamin@boisson', '$2b$10$cNdQ0Thga/6As9GB.8yv3.jHnXJQByHmLA1RSnrI.oFkD4db6NPwO'),
(4, 'judith@dubreuil', '$2b$10$Ag6Kn5Q44s9F0XRhUwmCY.deg5H6rSYEnxaF0Cul5.uTSL14KNf6m');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `interet`
--
ALTER TABLE `interet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `interet_relation`
--
ALTER TABLE `interet_relation`
  ADD KEY `interet_id` (`interet_id`),
  ADD KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `nb` (`nb`);

--
-- Index pour la table `localisation`
--
ALTER TABLE `localisation`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `target_id` (`target_id`);

--
-- Index pour la table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `question_relation`
--
ALTER TABLE `question_relation`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `nb` (`nb`);

--
-- Index pour la table `recherche`
--
ALTER TABLE `recherche`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `interet`
--
ALTER TABLE `interet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
