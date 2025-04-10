import { Component } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet],
  templateUrl: './countryLayout.component.html',
})
export class CountryLayoutComponent { }
