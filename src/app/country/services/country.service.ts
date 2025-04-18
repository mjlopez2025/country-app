import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>()

  searchByCapital (query: string): Observable<Country[]> {
    query = query.toLowerCase();

    console.log(this.queryCacheCapital);

    if(this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)?? []);
    }
    console.log(`Llegando al servidor por ${query}`);


    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log('Error Fetching', error);

        return throwError(() => new Error (`No se encontró un país con esa capital: ${query}`))
      })
    )
  }


  searchByCountry(query: string) {

    const url = `${API_URL}/name/${query}`
    query = query.toLowerCase();


    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000),
      catchError(error => {
        console.log('Error Fetching', error);

        return throwError(() => new Error (`No se encontró un país con esa capital: ${query}`))
      })
    )
  }

  searchCountryByAlphaCode(code: string) {

    const url = `${API_URL}/alpha/${code}`


    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError(error => {
        console.log('Error Fetching', error);

        return throwError(() => new Error (`No se encontró un país con ese código: ${code}`))
      })
    )
  }

}
