export interface Product {
  id: number;
  name: string;
  category: 'Firearms' | 'Ammunition' | 'Tactical Gear';
  price: number;
  image: string;
  specs: { [key: string]: string };
  description: string;
  stock: number;
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