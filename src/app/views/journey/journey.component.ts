import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  checkoutForm;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      departure: [null, Validators.required],
      arrival: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('form :>> ', this.checkoutForm.value)
  }

}
