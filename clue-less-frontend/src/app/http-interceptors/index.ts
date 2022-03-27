import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpMockinterceptor } from "./httpmockinterceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpMockinterceptor, multi: true }
];
