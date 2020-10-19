import {ItemPack} from './item-pack';
import {ItemType} from '../item';

const allMinions = new ItemPack('All', ItemType.Minion, []);

const trialMinions = new ItemPack('Trials', ItemType.Minion, [
  '301', // Poogie
  '122', // Enkidu
  '104', // Wind-up Ultros
]);

const raidMinions = new ItemPack('Raids', ItemType.Minion, [
  '395', // 2P Automaton
  '394', // 2B Automaton
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
  '381', // Wind-up Mystel
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
  '385', // Ephemeral Necromancer
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

const craftingMinions = new ItemPack('Crafting', ItemType.Minion, [
  '327', // Seitei
  '303', // Scarlet Peacock
  '294', // Wind-up Sadu
  '282', // Wind-up Magnai
  '278', // Private Moai
  '284', // Byakko Cub
  '275', // Wind-up Shinryu
  '265', // Wind-up Ravana
  '255', // Wind-up Chimera
  '262', // Wind-up Lakshmi
  '261', // Wind-up Susano
  '263', // Wind-up Bismarck
  '186', // Wind-up Shiva
  '185', // Wind-up Ramuh
  '171', // Wind-up Leviathan
  '170', // Wind-up Titan
  '169', // Wind-up Garuda
  '168', // Wind-up Ifrit
  '158', // Wind-up Illuminatus
  '147', // Steam-powered Gobwalker G-VII
  '140', // Clockwork Barrow
  '143', // Iron Dwarf
  '136', // Atrophied Atomos
  '100', // Model Magitek Bit
  '95', // Nana Bear
  '81', // Magic Broom
  '66', // Plush Cushion
  '43', // Model Vanguard
  '53', // Wind-up Qiqirn
  '39', // Wind-up Aldgoat
  '29', // Wind-up Dullahan
  '22', // Gravel Golem
]);

const gatheringMinions = new ItemPack('Gathering', ItemType.Minion, [
  '244', // Tiny Tatsunoko
  '237', // Castaway Chocobo Chick
  '188', // Magic Bucket
  '38', // Coblyn Larva
  '48', // Kidragora
  '30', // Gigantpole
  '24', // Tiny Tortoise
]);

const purchaseMinions = new ItemPack('Purchase', ItemType.Minion, [
  '380', // Lalinator 5.H0
  '387', // Sand Fox
  '363', // Cerberpup
  '379', // Unlucky Rabbit
  '368', // Little Leafman
  '370', // The Behatted Serpent Of Ronka
  '369', // The Behelmeted Serpent Of Ronka
  '358', // Cute Justice
  '360', // Dress-up Estinien
  '357', // Miniature White Knight
  '354', // Wind-up Pixie
  '346', // Tinker's Bell
  '351', // Ironfrog Ambler
  '326', // Wind-up Nu Mou
  '342', // Giant Beaver
  '340', // Bitty Duckbill
  '350', // Butterfly Effect
  '345', // Wind-up Omega-F
  '344', // Wind-up Omega-M
  '338', // Micro Gigantender
  '328', // Zephyrous Zabuton
  '322', // Wind-up Qalyana
  '323', // Wind-up Redback
  '324', // Minitek Conveyor
  '292', // Frilled Dragon
  '291', // Clockwork Lantern
  '298', // Wind-up Zhloe
  '302', // Attendee #777
  '277', // Wind-up Ananta
  '288', // Komainu
  '264', // Wind-up Hien
  '266', // Wind-up Kojin
  '274', // Wind-up Ixion
  '260', // Wind-up Khloe
  '256', // Wind-up Meateater
  '243', // Tora-jiro
  '242', // Fox Kit
  '194', // Pegasus Colt
  '190', // Baby Brachiosaur
  '236', // Wind-up Moon
  '228', // Wind-up Estinien
  '235', // Wind-up Ohl Deeh
  '218', // Dress-up Alisaie
  '217', // Dress-up Thancred
  '198', // Hecteye
  '196', // Wind-up Sasquatch
  '187', // Piggy
  '191', // Wind-up Cheerleader
  '184', // Wind-up Dragonet
  '174', // Wind-up Nero Tol Scaeva
  '156', // Wind-up Gnath
  '175', // Wind-up Vath
  '172', // Wind-up Zundu Warrior
  '135', // Wind-up Gundu Warrior
  '162', // Hunting Hawk
  '157', // Paissa Brat
  '167', // Wind-up Firion
  '144', // Griffin Hatchling
  '148', // Behemoth Heir
  '117', // Water Imp
  '20', // Black Coeurl
  '84', // Wind-up Nanamo
  '106', // Heavy Hatchling
  '127', // Wind-up Sea Devil
  '126', // Wind-up Kobolder
  '59', // Wind-up Ixal
  '125', // Wind-up Dezul Qualan
  '124', // Wind-up Founder
  '123', // Wind-up Violet
  '85', // Wind-up Gilgamesh
  '49', // Wind-up Goblin
  '93', // Treasure Box
  '83', // Zu Hatchling
  '82', // Wind-up Succubus
  '77', // Wind-up Warrior Of Light
  '65', // Wind-up Sun
  '76', // Wind-up Odin
  '61', // Wind-up Sahagin
  '60', // Wind-up Kobold
  '67', // Minion Of Light
  '71', // Wind-up Leader
  '58', // Wind-up Amalj'aa
  '50', // Wind-up Sylph
  '51', // Wind-up Cursor
  '2', // Mammet #001
  '37', // Fledgling Dodo
  '36', // Beady Eye
  '28', // Dust Bunny
  '26', // Baby Bat
  '25', // Baby Raptor
  '17', // Wide-eyed Fawn
  '13', // Tiny Rat
  '1', // Cherry Bomb
  '54', // Black Chocobo Chick
  '11', // Flame Hatchling
  '10', // Serpent Hatchling
  '9', // Storm Hatchling
  '3', // Wayward Hatchling
]);

const yoKaiWatchMinions = new ItemPack('Yo-kai Watch', ItemType.Minion, [
  '393', // Damona
  '392', // 	Zazel
  '391', // Lord Ananta
  '390', // Lord Enma
  '213', // USApyon
  '211', // Robonyan F-type
  '210', // Hovernyan
  '209', // Shogunyan
  '208', // Venoct
  '207', // Noko
  '206', // Manjimutt
  '205', // Komajiro
  '204', // Kyubi
  '203', // Blizzaria
  '202', // Whisper
  '201', // Komasan
  '200', // Jibanyan
]);

const bozjaMinions = new ItemPack('Bozja', ItemType.Minion, [
  '389', // Dáinsleif F1,
  '383', // Magitek Helldiver F1,
  '321', // Wind-up Weapon,
  '329', // Abroader Otter,
  '278', // Private Moai,
  '271', // Koala Joey,
]);

export const MinionPacks: ItemPack[] = [
  allMinions,
  yoKaiWatchMinions,
  trialMinions,
  raidMinions,
  eurekaMinions,
  fateMinions,
  questMinions,
  dungeonMinions,
  deepDungeonMinions,
  craftingMinions,
  gatheringMinions,
  purchaseMinions,
  bozjaMinions
];
