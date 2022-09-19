import { Injectable } from '@angular/core';
import { ConvertCurrencyPipe } from '../pipe/convert-currency.pipe';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightsService {

  arrFlights = []

  constructor(private changeCurrency: ConvertCurrencyPipe) { }

  public findJourney(origin, destination, flights) {
    // console.log('flights :>> ', flights);
    // console.log('model :>> ', model);
    const model = {origin, destination}
    this.arrFlights = []
    const findOrigin = flights.find((flight) => flight.departureStation === model.origin); // Se verifica si existe el lugar de origen
    const findDestination = flights.find((destination) => destination.arrivalStation === model.destination); // Se verifica si existe el lugar destino
    if (findOrigin) { // Si existe origen
      if (findDestination) { // Si existe destino, se construye la ruta
        // console.log('Destino :>> ', model.destination);
        try {
          this.findFlights(flights, model.origin, model.destination);
          const journey = this.buildRoute(model)
          // console.log('route :>> ', journey);
          return journey;
        } catch (error) {
          console.log('No se encontro un vuelo disponible');
        }
      } else {
        console.log('Destino no disponible');
      }
    } else {
      console.log('Origen no disponible');
    }
  }

  findFlights(flights, origin, destination) {
    const findOrigin = flights.find((flight) => flight.departureStation === origin);
    const findDestinationTemp = flights.find((flight) => flight.departureStation === origin).arrivalStation;
    // console.log('--> vuelo origen ::>> ', findOrigin.departureStation);
    // console.log('Llegada del vuelo a :>> ', findDestinationTemp);
    const posRoute = flights.indexOf(findOrigin); // Se obtiene la posicion del objeto en array de vuelos
    this.arrFlights.push(flights[posRoute]); // Se almacena la ruta
    if (destination !== findDestinationTemp) {
      flights.splice(posRoute, 1); // Se elimina el vuelo
      this.findFlights(flights, findDestinationTemp, destination);
    } else {
      // console.log('Se llego al destino :>> ', findDestinationTemp);
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
