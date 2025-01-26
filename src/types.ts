export interface ProductDetails {
  name: string;
  price: string;
  images: string[];
  description: string;
  Brand: string;
  'Product#': string;
  'Volts:': string;
  'Amps:': string;
  'Regulator:': string;
}

export interface Product {
  category: string;
  name: string;
  price: string;
  image: string;
  link: string;
  details: ProductDetails;
}