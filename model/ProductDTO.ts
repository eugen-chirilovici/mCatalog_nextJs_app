export interface ProductDTO {
  uuid: string;
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  size?: string;
}