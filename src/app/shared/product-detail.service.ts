import { Injectable } from '@angular/core';
import { ProductDetail } from './product-detail.model';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http:HttpClient) { }

  formData: ProductDetail = new ProductDetail();
  list: ProductDetail[];
  readonly baseURL = 'http://localhost:59720/api/ProductDetail';

  postProductDetail(){
    return this.http.post(this.baseURL, this.formData);
  }
  
  putProductDetail(){
    return this.http.put(`${this.baseURL}/${this.formData.productDetailID}`, this.formData);
  }

  getProductDetails(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as ProductDetail[]);
  }

  deleteProductDetail(productDetailID: number){
    
    return this.http.delete(`${this.baseURL}/${productDetailID}`);
  }
}

