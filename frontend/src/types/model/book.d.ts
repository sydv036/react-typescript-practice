export {};

declare global {
  interface IBookTable {
    _id: string;
    thumbnail: string;
    slider: string[];
    mainText: string;
    author: string;
    price: number;
    sold: number;
    quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string;
  }
  interface IBookInsertOrUpdate {
    thumbnail: string;
    slider: string[];
    mainText: string;
    author: string;
    price: number;
    quantity: number;
    category: string;
  }
}
