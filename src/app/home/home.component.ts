import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private prodcutsService: ProductsService
  ){}

  products: Product[] = [];

  onProductOutput(product: Product){
    console.log(product, 'Output');
  }

  fetchProducts(page: number, perPage: number){
    this.prodcutsService.getProducts('http://localhost:3000/clothes', {page, perPage}).subscribe((products: Products) => {
      console.log(products.items);
      this.products = products.items;
    })
  }
  ngOnInit(){
    this.fetchProducts(0, 5);
   
  }
}
