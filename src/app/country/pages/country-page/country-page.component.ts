import { Component, inject } from '@angular/core';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';
import { ActivatedRoute } from '@angular/router';
import countryRoutes from '../../country.routes';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params["code"];
  CountryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({ request}) => {
      return this.CountryService.searchCountryByAlphaCode(request.code);
    }
  })


}
