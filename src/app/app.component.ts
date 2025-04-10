import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryLayoutComponent } from "./country/layouts/countryLayout/countryLayout.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {


}
