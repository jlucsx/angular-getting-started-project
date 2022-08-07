import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];
  constructor(private httpClient: HttpClient) {}

  addToCart(product: Product): void {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    const response = this.httpClient.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
    return response;
  }

  getTotal() {
    const cartItemPrices = this.items.map((item) => item.price);
    const sumOfThePrices = cartItemPrices.reduce((a, b) => a + b);
    return sumOfThePrices;
  }
}
