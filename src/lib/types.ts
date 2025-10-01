export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  specifications: { [key: string]: string };
  availability: 'In Stock' | 'Out of Stock';
}

export interface CartItem extends Product {
  quantity: number;
}
