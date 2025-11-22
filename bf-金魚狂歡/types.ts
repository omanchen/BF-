export interface Goldfish {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  image: string;
  tags: string[];
}

export type DiscountType = 7 | 8 | 9 | null;

export interface DrawResult {
  discount: DiscountType;
  message: string;
}
