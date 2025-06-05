export interface Statistics {
  season: { month: string; year: string };
  yearSales: UnitSales;
  monthSales: UnitSales;
  totalVideoGames: number;
}

export interface UnitSales {
  currentSales: Sales;
  prevSales: Sales;
  bestWorstSellingGames: BestWorstSellingGames;
}

export interface BestWorstSellingGames {
  mostSoldVideoGame: StSoldVideoGame;
  leastSoldVideoGame: StSoldVideoGame;
}

export interface StSoldVideoGame {
  titulo: string;
  slug: string;
  sales: number;
}

export interface Sales {
  sales: Sale[];
  count: number;
  profit: number;
}

export interface Sale {
  unit: string;
  profit: number;
  amount: number;
}
export type SalesType = keyof Omit<Statistics, 'season' | 'totalVideoGames'>;
export type SalesDelta = 'increase' | 'same' | 'decrease';
