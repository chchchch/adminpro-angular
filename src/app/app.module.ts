import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//rutas
import { APP_ROUTES } from './app.routes';

//modulos
import { PagesModule } from './pages/pages.module';


//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PipesModule } from './pipes/pipes.module';
import { PAGES_ROUTES } from './pages/pages.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    //PagesModule, porque lo cargo con el lazyload
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
