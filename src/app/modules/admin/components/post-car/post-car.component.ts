import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent implements OnInit {

  postCarForm!: FormGroup;
  isSpinning = false;
  selectedFile!: File;
  imagePreview: string | null = null;

  listOfBrands: string[] = ["Mercedes", "AUDI", "TESLA", "BMW", "TOYOTA", "FORD", "SIAT", "HYUNDAI", "KIA"];
  listOfTypes: string[] = ["Petrol", "Diesel", "Electric"];
  listOfColors: string[] = ["Red", "White", "Blue", "Grey", "Black", "Orange"];
  listOfTransmissions: string[] = ["Manual", "Automatic"];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  postCar(): void {
    console.log(this.postCarForm.value);

    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('name', this.postCarForm.get('name')?.value);
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);
    formData.append('description', this.postCarForm.get('description')?.value);
    formData.append('year', this.postCarForm.get('year')?.value);


    this.adminService.postCar(formData).subscribe((res) => {
      console.log(res);
      this.notification.success('Success', 'Car posted successfully');
      this.route.navigateByUrl('/admin/dashboard');
    },
      (err) => {
        console.error('Error posting car:', err);
        let errorMessage = 'Failed to post car';
        if (err.error && typeof err.error === 'string') {
          errorMessage = err.error;
        }
        this.notification.error('Failed', errorMessage);
      });
  }
  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
