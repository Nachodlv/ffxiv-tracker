import {ItemPack} from './item-pack';
import {ItemType} from '../item';

const allMounts = new ItemPack('All', ItemType.Mount, []);

const cylPack: ItemPack = new ItemPack('Cyl Pack', ItemType.Mount, [
  '186',
]);

const trialPack: ItemPack = new ItemPack('Trials', ItemType.Mount, [
  '22', // Nightmare
  '29', // Xanthos
  '30', // Gullfaxi
  '28', // Aithon
  '31', // Enbarr
  '40', // Markab
  '43', // Boreas
  '75', // White Lanner
  '76', // Rose Lanner
  '77', // Round Lanner
  '78', // Warring Lanner
  '90', // Dark Lanner
  '98', // Sophic Lanner
  '104', // Demonic Lanner
  '115', // Blissful Kamuy
  '116', // Reveling Kamuy
  '133', // Legendary Kamuy
  '144', // Auspicious Kamuy
  '158', // Lunar Kamuy
  '161', // Rathalos
  '172', // Euphonious Kamuy
  '182', // Hallowed Kamuy
  '189', // Fae Gwiber
  '192', // Innocent Gwiber
  '205', // Shadow Gwiber
  '217', // Ruby Gwiber
  '226', // Gwiber Of Light
]);

const raidMounts = new ItemPack('Raids', ItemType.Mount, [
  '219', // Ramuh
  '188', // Skyslipper
  '173', // Model O
  '156', // Air Force
  '126', // Alte Roite
  '101', // Arrhidaeus
  '58', // Gobwalker
]);

const questMounts = new ItemPack('Quests', ItemType.Mount, [
  '230', // Ehll Tou
  '181', // Kamuy Of The Nine Tails
  '125', // Yol
  '105', // Firebird
  '45', // Black Chocobo
  '55', // Manacutter
  '50', // Midgardsormr
  '47', // Kirin
  '41', // Ceremony Chocobo
  '15', // Unicorn
  '6', // Magitek Armor
  '1', // Company Chocobo
]);

const feastMounts = new ItemPack('Feasts', ItemType.Mount, [
  '229', // 	Magitek Hyperconveyor
  '202', // Epimetheus
  '179', // Maxima Roader
  '176', // Magna Roader
  '163', // Prototype Conveyor
  '162', // Magitek Conveyor
  '113', // Lone Faehound
  '114', // Pack Faehound
  '109', // Pack Hellhound
  '108', // Lone Hellhound
]);

const eurekaMounts = new ItemPack('Eureka', ItemType.Mount, [
  '184', // Eurekan Petrel
  '178', // Eldthurs
  '150', // Tyrannosaur
  '186', // Ozma
]);

const yoKaiWatchMounts = new ItemPack('Yo-kai Watch', ItemType.Mount, [
  '228', // Jibanyan Couch
  '94', // Whisper A-go-go
  '87', // Whisper-go
]);

export const MountPacks: ItemPack [] = [
  allMounts, yoKaiWatchMounts, trialPack, raidMounts, eurekaMounts, questMounts, feastMounts
];
