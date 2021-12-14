/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { OrderItem } from './order-item';
import { User } from '@e-comm/users'

export class Order {
    id?: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: any;
    dateOrdered?: string;
}