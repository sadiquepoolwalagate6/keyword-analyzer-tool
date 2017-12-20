import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

//export const routing = RouterModule.forRoot(appRoutes);
export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
//export const routes : ModuleWithProviders = RouterModule.forRoot(router, { useHash: true });
