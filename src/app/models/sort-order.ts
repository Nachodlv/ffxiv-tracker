export class SortOrder {
  public playerSort: PlayerSort = PlayerSort.Rank;
  public itemSort: ItemSort = ItemSort.Id;
  public playerAscending = false;
  public itemAscending = false;
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
