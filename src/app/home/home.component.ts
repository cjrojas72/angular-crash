import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private prodcutsService: ProductsService
  ){}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  onProductOutput(product: Product){
    console.log(product, 'Output');
  }

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number){
    this.prodcutsService.getProducts('http://localhost:3000/clothes', {page, perPage}).subscribe({
      next: (data: Products) =>{
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addProduct(product: Product){
    this.prodcutsService.addProdcut('http://localhost:3000/clothes', product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editProduct(product: Product, id: number){
    this.prodcutsService.editProdcut(`http://localhost:3000/clothes/${id}`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => console.log(error),
    })
  }

  deleteProduct(product: Product, id: number){
    this.prodcutsService.deleteProdcut(`http://localhost:3000/clothes/${id}`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(){
    this.fetchProducts(0, this.rows);
   
  }
}
