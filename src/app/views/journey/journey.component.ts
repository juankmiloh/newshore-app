import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightsService } from 'src/app/api/flights.service';
import { LIST_CURRENCY } from 'src/app/constants/constants';
import { SearchFlightsService } from 'src/app/services/search-flights.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  checkoutForm: FormGroup;
  currencies = LIST_CURRENCY;
  x = window.matchMedia('(max-width: 800px)'); // return true when mobile
  sizeDevice = this.x.matches;
  flights: any[] = [];
  errorMessage = '';
  currency = '';
  goJourney;
  backJourney;
  total = 0;
  Swal = require('sweetalert2');

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightsService,
    private flight: SearchFlightsService
  ) {
    this.checkoutForm = this.formBuilder.group({
      flightOption: ['1'],
      origin: ['AZL'],
      destination: ['BOG'],
      typeCurrency: ['COP']
      // flightOption: [null, Validators.required],
      // origin: [null, Validators.required],
      // destination: [null, Validators.required],
      // typeCurrency: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getFlights()
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const model = this.checkoutForm.value;
      if (model.origin !== model.destination) {
        this.total = 0;
        const goFlights = JSON.parse(localStorage.getItem('flights'));
        const backFlights = JSON.parse(localStorage.getItem('flights'));
        this.currency = model.typeCurrency;
        localStorage.setItem('valCurrency', model.typeCurrency);
        if (model.flightOption === '0') {
          this.goJourney = {};
          this.backJourney = {};
          this.goJourney = this.flight.findJourney(model.origin, model.destination, goFlights);
          this.backJourney = this.flight.findJourney(model.destination, model.origin, backFlights);
          this.total += this.goJourney['Journey']['Price'];
          this.total += this.backJourney['Journey']['Price'];
        }
        if (model.flightOption === '1') {
          this.goJourney = {}
          this.backJourney = null;
          this.goJourney = this.flight.findJourney(model.origin, model.destination, JSON.parse(localStorage.getItem('flights')));
          console.log('JOURNEY :>> ', this.goJourney);
          this.total += this.goJourney['Journey']['Price'];
        }
      } else {
        Swal.fire({
          title: 'Info',
          text: '¡Origen debe ser diferente del destino!',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
    }
  }

  getFlights() {
    this.flightService.getFlights().subscribe(flights => {
      localStorage.setItem('flights', JSON.stringify(flights));
    }, error => this.errorMessage = error);
  }

}
