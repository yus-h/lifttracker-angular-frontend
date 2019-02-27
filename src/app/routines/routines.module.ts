import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RoutinesComponent } from './/routines.component';
import { RoutinesRoutingModule } from './routines-routing.module';
import { RoutineEditComponent } from './routine-edit/routine-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SingleExerciseFormComponent } from './routine-edit/single-exercise-form/single-exercise-form.component';
import { SetRepFormComponent } from './routine-edit/single-exercise-form/set-rep-form/set-rep-form.component';
import { ExerciseService } from '../exercises/exercise.service';
import { RoutineService } from './routine.service';
import { RoutineListComponent } from './routine-list/routine-list.component';
import { RoutineItemComponent } from './routine-list/routine-item/routine-item.component';
import { AuthGuard } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    RoutinesComponent,
    RoutineEditComponent,
    SingleExerciseFormComponent,
    SetRepFormComponent,
    RoutineListComponent,
    RoutineItemComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RoutinesRoutingModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [
    ExerciseService,
    RoutineService,
    AuthGuard
  ]
})
export class RoutinesModule { }
