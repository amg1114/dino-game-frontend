export interface Asset {
  id: number;
  title: string;
  url: string;
}

export interface VideoGameAsset {
  id: number;
  createdAt: Date;
  deletedAt: null;
  asset: Asset;
}