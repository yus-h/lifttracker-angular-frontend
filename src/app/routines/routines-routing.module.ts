import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutinesComponent } from './routines.component';
import { RoutineEditComponent } from './routine-edit/routine-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
    { path: '', component: RoutinesComponent,  canActivate: [AuthGuard], children: [
      { path: 'new', component: RoutineEditComponent },
      { path: ':id', component: RoutineEditComponent },

      // { path: 'test', component: RoutineEditComponent }

    ]
    }
];

/**
 * This is defined..
 */
@NgModule({
  imports: [
    // note: not forRoot as in app-routing.module.ts
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
  ]
})
export class RoutinesRoutingModule {}
