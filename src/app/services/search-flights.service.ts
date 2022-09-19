import { Injectable } from '@angular/core';
import { ConvertCurrencyPipe } from '../pipe/convert-currency.pipe';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightsService {

  arrFlights = [];
  Swal = require('sweetalert2');

  constructor(private changeCurrency: ConvertCurrencyPipe) { }

  public findJourney(origin, destination, flights) {
    const model = { origin, destination }
    this.arrFlights = []
    const findOrigin = flights.find((flight) => flight.departureStation === model.origin); // Se verifica si existe el lugar de origen
    const findDestination = flights.find((destination) => destination.arrivalStation === model.destination); // Se verifica si existe el lugar destino
    const journey = {"Journey": {"Price": this.changeCurrency.transform(0)}}; // Se crea el objeto vacio por defecto
    
    if (findOrigin) { // Si existe origen
      if (findDestination) { // Si existe destino, se construye la ruta
        try {
          this.findFlights(flights, model.origin, model.destination);
          return this.buildRoute(model); // Se devuelve el objeto con todos los valores de la ruta
        } catch (error) {
          Swal.fire({title: 'Info', text: '!Vuelo no disponible!', icon: 'info', confirmButtonText: 'Ok'});
        }
      } else {
        Swal.fire({title: 'Info', text: '!Destino no disponible!', icon: 'info', confirmButtonText: 'Ok'});
        return journey;
      }
    } else {
      Swal.fire({title: 'Info', text: '!Origen no disponible!', icon: 'info', confirmButtonText: 'Ok'});
      return journey;
    }
  }

  findFlights(flights, origin, destination) {
    const findOrigin = flights.find((flight) => flight.departureStation === origin);
    const findDestinationTemp = flights.find((flight) => flight.departureStation === origin).arrivalStation;

    const posRoute = flights.indexOf(findOrigin); // Se obtiene la posicion del objeto en array de vuelos

    this.arrFlights.push(flights[posRoute]); // Se almacena la ruta
    flights.splice(posRoute, 1); // Se elimina el vuelo

    const filterShortFlight = flights.filter((flight) => { // Se busca la ruta mas corta
      if (findDestinationTemp === flight.departureStation && destination === flight.arrivalStation) {
        return flight;
      }
    });

    if (filterShortFlight.length === 1) { // Si hay un vuelo directo se termina la busqueda
      const posRoute = flights.indexOf(filterShortFlight[0]); // Se obtiene la posicion del objeto en array de vuelos
      this.arrFlights.push(flights[posRoute]); // Se almacena la ruta
      return;
    } else {
      if (destination !== findDestinationTemp) { // Si no hay un vuelo directo se continua la busqueda
        this.findFlights(flights, findDestinationTemp, destination);
      }
    }
  }

  buildRoute(model) {
    const arrTemp = [];
    let journey = {};
    let price = 0;
    this.arrFlights.forEach(element => {
      price += element.price;
      const obj = {
        "Origin": element.departureStation,
        "Destination": element.arrivalStation,
        "Price": this.changeCurrency.transform(element.price),
        "Transport": {
          "FlightCarrier": element.flightCarrier,
          "FlightNumber": element.flightNumber
        }
      }
      arrTemp.push(obj)
    });
    journey = {
      "Journey": {
        "Origin": model.origin,
        "Destination": model.destination,
        "Price": this.changeCurrency.transform(price),
        "Flights": arrTemp
      }
    };
    return journey;
  }
}
