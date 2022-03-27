import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpMockLobbyInterceptor } from "./httpmocklobbyinterceptor";
import { HttpMockPlayerInterceptor } from "./httpmockplayerinterceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpMockPlayerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpMockLobbyInterceptor, multi: true }
];
