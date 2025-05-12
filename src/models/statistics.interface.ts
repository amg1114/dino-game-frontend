export interface Statistics {
  yearSales: YearSales;
  monthSales: MonthSales;
  totalVideoGames: number;
}

export interface MonthSales {
  currentMonthSales: Sales;
  prevMonthSales: Sales;
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

export type SalesType = YearSales | MonthSales;

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

export interface YearSales {
  currentYearSales: Sales;
  prevYearSales: Sales;
  bestWorstSellingGames: BestWorstSellingGames;
}
