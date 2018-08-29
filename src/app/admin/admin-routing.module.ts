import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [

    ]
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
      ],
      exports: [RouterModule]
})

export class AdminRoutingModule { }
