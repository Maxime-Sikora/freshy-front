export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: 'producer' | 'admin' | 'customer';
}
