import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from 'src/app/shared/product-detail.service';
import { NgForm } from '@angular/forms';
import { ProductDetail } from 'src/app/shared/product-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styles: [
  ]
})
export class ProductDetailFormComponent implements OnInit {

  // dependency injection
  constructor(public service:ProductDetailService, private toastr:ToastrService) { }
  public workInProgress : boolean = false;
  ngOnInit(): void {
  
  }

  onSubmit(form:NgForm){
  
   if (this.service.formData.productDetailID == 0) {
      
       this.workInProgress = true;  
       // simulates processing a request
       setTimeout(()=> {                          
         this.InsertProductDetail(form); // insert record
         this.workInProgress = false;
       }, 3000);

   }
   else{
      this.workInProgress = true;  
      // simulates processing a request
      setTimeout(()=> {                          
        this.UpdateProductDetail(form); // Update record
        this.workInProgress = false;
      }, 3000);

   }
   
  }

  InsertProductDetail(form:NgForm){
   
    this.service.postProductDetail().subscribe(

      res => {
        this.ResetForm(form);
        this.toastr.success("Submitted successfully","Product Detail Register");
        this.service.getProductDetails();
      },
      err => {console.log(err);}
    )

  }

  UpdateProductDetail(form:NgForm){
  this.service.putProductDetail().subscribe(

        res => {
          this.ResetForm(form);  
          this.toastr.info("Updated successfully","Product Detail Register");
          this.service.getProductDetails();
        },
        err => {console.log(err);}
      )

  }

  ResetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new ProductDetail()
  }
}
