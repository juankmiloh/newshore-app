import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  checkoutForm;
  x = window.matchMedia('(max-width: 800px)'); // return true when mobile
  sizeDevice = this.x.matches;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      departure: [null, Validators.required],
      arrival: [null, Validators.required],
      scale: [null, Validators.required],
      flightOption: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('form :>> ', this.checkoutForm.value)
  }

}
