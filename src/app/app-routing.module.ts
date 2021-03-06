import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    { 
      path: '', 
      component: HomeComponent
    },
    { 
      path: 'users', 
      component: UsersComponent, 
      children: [
        { path: ':id', component: UserComponent},
        { path: ':id/:name', component: UserComponent}
      ]
    },
    { 
      path: 'servers/salim',
      //canActivate: [AuthGuard],
      canActivateChild: [AuthGuard], 
      // canActivate activates the parent route and all child routes 
      // whereas canActivateChild activates on child routes
      component: ServersComponent,
      children: [
        // { path: ':id', component: ServerComponent},
        // this server key is upto me..
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
        // canDeactivate route is activated when we leave a 
        // particular route without saving the changes
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
      ]
    },
    // { 
    //   path: 'not-found', 
    //   component: PageNotFoundComponent
    // },
    { 
      path: 'not-found', 
      component: ErrorPageComponent,
      data: {message: "Page not found!"}
    },
    // wildcard route should be the last one!
    { 
      path: '**', 
      redirectTo: '/not-found'
    }
  ]

@NgModule({
    imports: [
        // it places a hash telling the web server that only care what is 
        // before the hash sign in the URL.
        // RouterModule.forRoot(appRoutes, {useHash: true}) 
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule] // export router module.
})
export class AppRoutingModule {

}