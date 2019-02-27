import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exercise } from '../shared/exercise.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth/auth.service';
import { ExercisesPaged } from '../shared/exercises.paged.model';
import {MuscleGroup} from "../shared/musclegroup.model";

@Injectable()
export class ExerciseService {

  // TODO should this be a different/better type than string?
  exercisesChanged = new Subject<String>();


  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  // TODO for routine edit - first filter by body type, then exercise
  getExercisesAll(): Observable<ExercisesPaged>  {
    return this.httpClient.get<ExercisesPaged>('http://localhost:8080/api/exercises?page=' + 0 + ' + &size=100');
  }


  getExercises(pageNumber): Observable<ExercisesPaged>  {
    return this.httpClient.get<ExercisesPaged>('http://localhost:8080/api/exercises?page=' + pageNumber + ' + &size=3&filters=');
  }

  getExercises2(pageNumber, muscleGroupFilterParams): Observable<ExercisesPaged>  {

    console.log('getting exercises', muscleGroupFilterParams); // todo why undefined if no elements
    let qString = '&filters=';


    muscleGroupFilterParams.forEach(function (mgroup, index) {

      if (index === 0) {
        qString += mgroup;
      } else {
        qString += '&filters=' + mgroup;
      }

      console.log('index', index); // index
      // console.log(sandwich); // value
    });

    console.log('qstring', qString);


    // return this.httpClient.get<ExercisesPaged>('http://localhost:8080/api/exercises?page=' + pageNumber + ' + &size=3&filters=');
    return this.httpClient.get<ExercisesPaged>('http://localhost:8080/api/exercises?page=' + pageNumber + ' + &size=3' + qString);

  }


  getExercise(id): Observable<Exercise> {
    return this.httpClient.get<Exercise>('http://localhost:8080/api/exercises/' + id);
  }

  addExercise(exercise) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.post('http://localhost:8080/api/exercises', exercise , { responseType: 'json', headers: headers });
  }

  // TODO differentiate between legit filterParams changed and e.g. just element edited
  notifySubscribersOfChange(resetPaging) {
    console.log('Notifying EXERCISES CHANGED - current', resetPaging);
    this.exercisesChanged.next(resetPaging);
  }

  updateExercise(exercise) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const options =  {
      headers: headers
    };
    return this.httpClient.put('http://localhost:8080/api/exercises/' + exercise.id, exercise, options);
  }

  deleteExercise(exercise) {

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    // See https://stackoverflow.com/questions/46049082/how-to-add-a-body-to-angular-httpclient-delete-function
    return this.httpClient.request('delete', 'http://localhost:8080/api/exercises/' + exercise.id, { body: exercise, headers: headers });
    // return this.httpClient.delete('http://localhost:8080/api/exercises/' + exercise.id, exercise);
  }

  getMuscleGroups() {
    console.log('a');
    return this.httpClient.get<MuscleGroup[]>('http://localhost:8080/api/musclegroups');
  }

}
