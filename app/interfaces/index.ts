export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  name: string;
  address: string;
  phone: string;
}

export interface UserSession {
  login: boolean;
  token: string;
  user: UserSessionData;
}

interface UserSessionData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: credential;
  orders: Order[];
}

export interface Order {
  id: number;
  name?: string;
  status?: string;
  date?: string;
  total?: number;
  products?: OrderProduct[];
  createdAt?: string; 
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface credential {
  id: number;
  password: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export interface ProductListProps {
  products: Product[];
  onClick: () => void;
}

// export interface Product{
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     image: string;
//     categoryId: number
// }

// export interface User{
//     id: number;
//     name: string;
//     email: string;
//     address: string;
//     phone: string
// }
// export interface UserLogin{
//     email: string;
//     password: string;
// }

// export interface UserData{
//     email: string;
//     name: string;
//     address: string;
//     phone: string
// }

// export interface UserSession {
//     login: boolean;
//     token: string;
//     user: UserSessionData;

// }
// interface UserSessionData {
//     id: number;
//     name: string;
//     email: string;
//     address:string;
//     phone:string;
//     role:string;
//     credential: credential;
//     orders: Order [];
// }

// export interface Order {
//     id: number;
//     name?: string;
//     status?: string;
//     date?: string;
//     total?: number
// }

// interface credential {
//     id: number;
//     password: string
// }

//  export interface SearchBarProps {
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSearch: () => void;
// }

// export interface ProductListProps {
//   products: Product[];
//   onClick: () => void;
// }
