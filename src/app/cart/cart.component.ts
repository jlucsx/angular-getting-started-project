import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total = 0;
  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  onSubmit() {
    this.items = this.cartService.clearCart();
    console.warn('Your order has been purchased', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
