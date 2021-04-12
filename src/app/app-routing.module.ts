import { OrdersAdminResolver } from './OrdersAdmin.resolver';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminComponent } from './admin/admin.component';
import { HistoryResolver } from './History-resolver';
import { HistoryComponent } from './history/history.component';

import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './route-guard';

const routes: Routes = [{path:'',component:HomeComponent,pathMatch:'full'},
{path:'order',component:OrderComponent,canActivate:[RouteGuard]},{
  path:'history',component:HistoryComponent,resolve:[HistoryResolver],canActivate:[RouteGuard]
},{path:'admin',component:AdminComponent},{path:'adminpanel',component:AdminpanelComponent,resolve:[OrdersAdminResolver],canActivate:[RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
