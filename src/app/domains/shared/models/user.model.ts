import { Customer } from "./customer.model";

export interface User {
  id: number;
  email: string;
  role: string;
  customer: Customer;
}
