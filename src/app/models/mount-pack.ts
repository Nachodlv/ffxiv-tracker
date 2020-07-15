import {Mount} from './mount';
import {Observable} from 'rxjs';

export class MountPack {
  public mounts$: Observable<Mount>[];

  constructor(public id: string, public name: string, public ids: string[]) {
  }
}

const lolPack: MountPack = new MountPack('1', 'Lol Pack', [
  '186',
  '1'
]);

const farmPack: MountPack = new MountPack('2', 'Farm Pack', [
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
  '78', // Dark Lanner
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
]);

export const Packs: MountPack [] = [
  lolPack,
  farmPack
];


