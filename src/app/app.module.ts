import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AdminModule } from './admin/admin.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import {AlertService, AuthenticationService, RecipeService, IngredientInfoService, UploadFileService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { ContactComponent } from './contact/index';
import { FooterComponent, HeaderComponent } from './shared/layout/index';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';
import { BlogComponent } from './blog/blog.component';
import { RegistrationComponent } from './registration/registration.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFontAwesomeModule} from "angular-font-awesome";


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    RecipeComponent,
    SearchComponent,
    BlogComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    AdminModule,
    AngularFontAwesomeModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    RecipeService,
    IngredientInfoService,
    UploadFileService,
    AuthenticationService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
