import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mappers';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<Region, Country[]>()

  searchByCapital (query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)?? []);
    }

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

    if(this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)?? []);
    }

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError(error => {
        console.log('Error Fetching', error);

        return throwError(() => new Error (`No se encontró un país con esa capital: ${query}`))
      })
    )
  }


  searchByRegion(region: Region) {

    const url = `${API_URL}/region/${region}`

    if(this.queryCacheCountry.has(region)) {
      return of(this.queryCacheRegion.get(region)?? []);
    }

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCountry.set(region, countries)),
      catchError(error => {
        console.log('Error Fetching', error);

        return throwError(() => new Error (`No se encontró un país con esa capital: ${region}`))
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
