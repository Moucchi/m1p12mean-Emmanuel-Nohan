import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor, httpInterceptor} from './interceptors/auth-token.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {provideQuillConfig} from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors(
        [
          authTokenInterceptor,
          httpInterceptor
        ]
      )
    ), provideCharts(withDefaultRegisterables()),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }]
        ]
      },
      placeholder: 'Écrivez ici...',
      theme: 'snow'
    })
  ]
};
