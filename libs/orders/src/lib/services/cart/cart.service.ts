import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  // constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if(!cart || undefined) {
      const initialCart = { 
        items: []
      };
      const initialCartJSON = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJSON);
    }
  }

  emptyCart() {
    const initialCart = { 
      items: []
    };
    const initialCartJSON = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJSON);
    this.cart$.next(initialCart);
  }

  getCart(): Cart {
    const cartJSONString: any = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJSONString);
    return cart;    
  }

  setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart {
    const cart: Cart = this.getCart();
    const cartItemExist = cart.items?.find((item:any) => item.productId === cartItem.productId);

    if (cartItemExist) {
      cart.items?.map((item: any) => {
        if(item.productId === cartItem.productId) {
          if(updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
          return item; 
        }
      })
    } else {
      cart.items?.push(cartItem); 
    }

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJSON);
    this.cart$.next(cart);

    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items?.filter((items) => {
      items.productId !== productId
    });
    const cartJSONString = JSON.stringify(newCart);
    
    if(!cartJSONString) {
      localStorage.setItem(CART_KEY, cartJSONString);
    } else {
      localStorage.removeItem(CART_KEY);
    }
    this.cart$.next(cart);
  }
}

