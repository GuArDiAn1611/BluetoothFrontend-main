import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
