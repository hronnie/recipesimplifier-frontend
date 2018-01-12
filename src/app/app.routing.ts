import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminReceiptComponent } from './admin/admin-receipt/admin-receipt.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin/main', component: AdminMainComponent, canActivate: [AuthGuard] },
    { path: 'admin/receipt', component: AdminReceiptComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);