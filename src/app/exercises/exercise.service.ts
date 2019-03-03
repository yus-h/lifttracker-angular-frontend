import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exercise } from '../shared/exercise.model';

import { AuthService } from '../auth/auth.service';
import { ExercisesPaged } from '../shared/exercises.paged.model';
import {MuscleGroup} from "../shared/musclegroup.model";
import { Observable, Subject } from 'rxjs/index';

@Injectable()
export class ExerciseService {

  // TODO should this be a different/better type than string?
  exercisesChanged = new Subject<String>();


  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  // TODO for routine edit - first filter by body type, then exercise
  // TODO refactor with ngrx
  getExercisesAll(): Observable<ExercisesPaged>  {
    return this.httpClient.get<ExercisesPaged>('http://localhost:8080/api/exercises?page=' + 0 + ' + &size=100');
  }

}
