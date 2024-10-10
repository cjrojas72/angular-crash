import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:  ApiService) {}

  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  addProdcut = (url: string, body: any): Observable<Products> =>{
    return this.apiService.post(url, body, {});
  }

  editProdcut = (url: string, body: any): Observable<Products> =>{
    return this.apiService.put(url, body, {});
  }

  deleteProdcut = (url: string, body: any): Observable<Products> =>{
    return this.apiService.delete(url, {});
  }
}


