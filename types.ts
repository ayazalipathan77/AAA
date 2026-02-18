export interface Product {
  id: number;
  name: string;
  category: 'Firearms' | 'Ammunition' | 'Tactical Gear' | 'Handguns' | 'Rifles';
  price: number;
  image: string;
  specs: { [key: string]: string };
  description: string;
  stock: number;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  total: number;
  status: 'PENDING' | 'DEPLOYED' | 'CANCELED';
  date: string;
  items: CartItem[];
  shipping: number;
  tax: number;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface IntelArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}