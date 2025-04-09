import { Component } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet],
  templateUrl: './countryLayout.component.html',
})
export class CountryLayoutComponent { }
