import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDetail } from '../shared/product-detail.model';
import { ProductDetailService } from '../shared/product-detail.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  constructor(public service: ProductDetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getProductDetails();
  }

  PopulateForm(selectedItem: ProductDetail){
    //this.service.formData = selectedItem; this line will be a two way binding
    this.service.formData = Object.assign({}, selectedItem);
  }

  onDelete(productDetailID: number){
    if (confirm('Are you sure you want to delete this record?'))
    {
      this.service.deleteProductDetail(productDetailID).subscribe(

        res => {
          this.toastr.error("Deleted successfully","Product Detail Register");
          this.service.getProductDetails();
        },
        err => {console.log(err);}
      )
    }

  }

}
