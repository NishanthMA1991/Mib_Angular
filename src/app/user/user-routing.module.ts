import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { UserComponent } from './user.component';

const userRoutes: Routes = [
    { path: '', component: UserComponent, children: [

      ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
      ],
      exports: [RouterModule]
})

export class UserRoutingModule { }
