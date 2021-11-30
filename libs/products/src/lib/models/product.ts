import { Category } from "./category";

export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?: string;
    category?: Category;
    countInStock?: string;
    rating?: string;
    numReviews?: string;
    isFeatured?: string;
    dateCreated?: string;
}