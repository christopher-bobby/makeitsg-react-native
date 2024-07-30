export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
export type ProductDetailType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
};


export type RootStackParamList = {
  ProductList: undefined;
  LoginScreen: undefined;
  AddProduct: undefined;
  ProductDetail: {
    id: string;
  };
};
  