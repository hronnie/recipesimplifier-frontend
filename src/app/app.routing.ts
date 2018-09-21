import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminRecipeComponent } from './admin/admin-recipe/admin-recipe.component';
import { ContactComponent } from './contact/contact.component';
import {RecipeComponent} from "./recipe/recipe.component";
import {SearchComponent} from "./search/search.component";
import {BlogComponent} from "./blog/blog.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AdminRecipeEditComponent} from "./admin/admin-recipe-edit/admin-recipe-edit.component";
import {IngredientInfoComponent} from "./admin";

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'recipe', component: RecipeComponent},
    { path: 'search', component: SearchComponent},
    { path: 'blog', component: BlogComponent},
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'admin/main', component: AdminMainComponent, canActivate: [AuthGuard] },
    { path: 'admin/recipe', component: AdminRecipeComponent, canActivate: [AuthGuard] },
    { path: 'admin/recipe/edit', component: AdminRecipeEditComponent, canActivate: [AuthGuard] },
    { path: 'admin/recipe/ingrinfo', component: IngredientInfoComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
