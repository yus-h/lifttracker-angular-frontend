import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExercisesComponent } from './exercises.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';


const routes: Routes = [
    { path: '', component: ExercisesComponent, children: [
    { path: 'new', component: ExerciseEditComponent },
    { path: ':id', component: ExerciseDetailComponent },
    { path: ':id/edit', component: ExerciseEditComponent }
    ]}
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
export class ExercisesRoutingModule {}
