import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppConfig } from './config/config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LocalForageModule } from 'ngx-localforage';
import { ComponentsModule } from './components/components.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const wsConfig: SocketIoConfig = { url: AppConfig.WS_URL, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    }),
    LocalForageModule.forRoot(),
    ComponentsModule,
    // SocketIoModule.forRoot(wsConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
