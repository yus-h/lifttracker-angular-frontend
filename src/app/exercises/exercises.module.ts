import { NgModule } from '@angular/core';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExercisesComponent } from './exercises.component';
import { ExercisesRoutingModule } from './exercises-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseService } from './exercise.service';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseItemComponent } from './exercise-list/exercise-item/exercise-item.component';
import { CommonModule } from '@angular/common';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { MusclegroupFilterComponent } from './musclegroup-filter/musclegroup-filter.component';

@NgModule({
  declarations: [
    ExercisesComponent,
    ExerciseEditComponent,
    ExerciseListComponent,
    ExerciseItemComponent,
    ExerciseDetailComponent,
    MusclegroupFilterComponent
  ],
  imports: [
    ExercisesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
  ],
  providers: [
    ExerciseService
  ]
})
export class ExercisesModule { }
