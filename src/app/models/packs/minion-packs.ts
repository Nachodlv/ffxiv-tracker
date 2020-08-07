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

const dungeonMinions = new ItemPack('Dungeons', ItemType.Minion, [
  '374', // Ancient One
  '361', // Little Leannan
  '349', // Shoebill
  '334', // Chameleon
  '333', // Black Hayate
  '352', // Forgiven Hate
  '347', // Tiny Echevore
  '339', // Clionid Larva
  '336', // Armadillo Bowler
  '321', // Wind-up Weapon
  '312', // Mudpie
  '290', // Monkey King
  '279', // White Whittret
  '272', // Salt & Pepper Seal
  '257', // Magitek Avenger F1
  '252', // Mock-up Grynewaht
  '249', // Dress-up Yugiri
  '247', // Road Sparrow
  '258', // Ghido
  '254', // Ivon Coeurlfist Doll
  '245', // Bombfish
  '226', // Bullpup
  '216', // Shaggy Shoat
  '189', // Calamari
  '180', // Morpho
  '179', // Brina
  '178', // Calca
  '166', // Korpokkur Kid
  '138', // Ugly Duckling
  '137', // Owlet
  '141', // Lesser Panda
  '134', // Unicolt
  '139', // Gaelikitten
  '112', // Mummy's Little Mummy
  '57', // Tight-beaked Parrot
  '102', // Naughty Nanka
  '80', // Baby Opo-opo
  '47', // Slime Puddle
  '44', // Demon Brick
  '42', // Bite-sized Pudding
  '12', // Morbol Seedling
]);

const deepDungeonMinions: ItemPack = new ItemPack('Deep Dungeons', ItemType.Minion, [
  '265', // Wind-up Ravana
  '262', // Wind-up Lakshmi
  '261', // Wind-up Susano
  '263', // Wind-up Bismarck
  '247', // Road Sparrow
  '258', // Ghido
  '241', // Odder Otter
  '246', // Bom Boko
  '245', // Bombfish
  '244', // Tiny Tatsunoko
  '237', // Castaway Chocobo Chick
  '190', // Baby Brachiosaur
  '219', // Wind-up Edda
  '216', // Shaggy Shoat
  '186', // Wind-up Shiva
  '185', // Wind-up Ramuh
  '197', // Dwarf Rabbit
  '171', // Wind-up Leviathan
  '170', // Wind-up Titan
  '169', // Wind-up Garuda
  '180', // Morpho
  '168', // Wind-up Ifrit
  '162', // Hunting Hawk
  '166', // Korpokkur Kid
  '157', // Paissa Brat
  '138', // Ugly Duckling
  '137', // Owlet
  '146', // Gestahl
  '141', // Lesser Panda
  '134', // Unicolt
  '142', // Page 63
  '139', // Gaelikitten
  '112', // Mummy's Little Mummy
  '96', // Miniature Minecart
  '97', // Nutkin
  '80', // Baby Opo-opo
  '56', // Minute Mindflayer
  '16', // Bluebird
  '27', // Tiny Bulb
  '23', // Wind-up Tonberry
]);

export const MinionPacks: ItemPack[] = [
  trialMinions, raidMinions, eurekaMinions, fateMinions, questMinions, dungeonMinions, deepDungeonMinions
];
