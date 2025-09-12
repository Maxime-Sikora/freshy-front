export interface CreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'producer' | 'admin';
}
