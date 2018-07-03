import { NgModule } from '@angular/core';
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
import { AlertService, AuthenticationService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { AdminMainComponent } from './admin/index';
import { AdminRecipeComponent } from './admin/index';
import { ContactComponent } from './contact/index';
import { AboutComponent } from './about/index';
import { FooterComponent, HeaderComponent } from './shared/layout/index';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';
import { BlogComponent } from './blog/blog.component';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
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
    AdminModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
