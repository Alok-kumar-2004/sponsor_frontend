import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorsListComponent } from './sponsors-list/sponsors-list.component';
import { AddSponsorsComponent } from './add-sponsors/add-sponsors.component';
import { UpdateSponsorComponent } from './update-sponsors/update-sponsors.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
 
const routes: Routes = [

  {path:"show-all-sponsors",component: SponsorsListComponent},
  {path:"add-sponsors", component: AddSponsorsComponent},
  {path:'', redirectTo: "home", pathMatch:"full"},
  {path:'updating-by-id/:id',component:UpdateSponsorComponent},
  {path:'details-of-sponsors/:id',component:ShowDetailsComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
