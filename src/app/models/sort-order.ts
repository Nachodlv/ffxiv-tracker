export class SortOrder {
  public playerSort: PlayerSort = PlayerSort.Rank;
  public itemSort: ItemSort = ItemSort.Id;
}

export enum PlayerSort {
  Rank= 'By Rank',
  Name = 'By Name',
  Quantity = 'By Quantity'
}

export enum ItemSort {
  Id= 'By Id',
  Name = 'By Name'
}
