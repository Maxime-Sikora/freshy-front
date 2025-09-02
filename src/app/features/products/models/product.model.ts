import { User } from '../../../shared/models/user.model';
import { Category } from '../../categories/models/categories.model';

export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  status: 'active' | 'inactive';
  category: Category;
  user: User;
}
