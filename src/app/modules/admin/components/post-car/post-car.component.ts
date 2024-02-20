import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent implements OnInit {

  postCarForm!: FormGroup;
  isSpinning = false;
  selectedFile!: File;
  imagePreview!: string | null;

  listOfBrands: string[] = ["Mercedes", "AUDI", "TESLA", "BMW", "TOYOTA", "FORD", "SIAT", "HYUNDAI", "KIA"];
  listOfTypes: string[] = ["Petrol", "Diesel", "Electric"];
  listOfColors: string[] = ["Red", "White", "Blue", "Grey", "Black", "Orange"];
  listOfTransmissions: string[] = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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

  postCar() {
    console.log(this.postCarForm.value);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}