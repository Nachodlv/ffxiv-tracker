import {ItemPack} from './item-pack';
import {ItemType} from '../item';

const trialMinions = new ItemPack('Trials', ItemType.Minion, [
  '301', // Poogie
  '122', // Enkidu
  '104', // Wind-up Ultros
]);

const raidMinions = new ItemPack('Raids', ItemType.Minion, [
  '332', // Wind-up Ryne
  '365', // Pod 316
  '364', // Pod 054
  '341', // Eden Minor
  '270', // Wind-up Ramza
  '305', // OMG
  '299', // Construct 8
  '281', // Wind-up Kefka
  '259', // Wind-up Exdeath
  '232', // Wind-up Scathach
  '215', // Toy Alexander
  '195', // Wind-up Calofisteri
  '176', // Faustlet
  '160', // Wind-up Echidna
  '101', // Puff Of Darkness
  '92', // Wind-up Onion Knight
]);

const eurekaMinions = new ItemPack('Eureka', ItemType.Minion, [
  '319', // Yukinko Snowflake
  '318', // Conditional Virtue
  '314', // Wind-up Elvaan
  '315', // Dhalmel Calf
  '296', // Wind-up Tarutaru
  '295', // Copycat Bulb
  '286', // Wind-up Mithra
  '287', // The Prince Of Anemos
  '285', // Wind-up Fafnir
  '178', // Calca
]);

const fateMinions = new ItemPack('Fates', ItemType.Minion, [
  '154', // Gold Rush Minecart
  '34', // Smallshell
  '31', // Pudgy Puk
  '18', // Infant Imp
  '14', // Baby Bun
]);

const questMinions = new ItemPack('Quests', ItemType.Minion, [
  '306', // Wind-up G'raha Tia
  '342', // Giant Beaver
  '337', // The Great Serpent Of Ronka
  '304', // Wind-up Alpha
  '300', // Palico
  '276', // Dress-up Raubahn
  '231', // Anima
  '230', // Gigi
  '224', // Wind-up Moenbryda
  '193', // Wind-up Aymeric
  '181', // Poro Roggo
  '173', // Wind-up Haurchefant
  '149', // Accompaniment Node
  '133', // Wind-up Cid
  '130', // Wind-up Alphinaud
  '119', // Midgardsormr
  '21', // Wind-up Gentleman
  '45', // Mini Mole
  '35', // Wolf Pup
  '32', // Buffalo Calf
  '19', // Coeurl Kitten
  '52', // Wind-up Airship
  '41', // Goobbue Sproutling
  '33', // Cactuar Cutting
  '15', // Chigoe Larva
]);

export const MinionPacks: ItemPack[] = [
  trialMinions, raidMinions, eurekaMinions, fateMinions, questMinions
];
