import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExercisesPaged } from '../../shared/exercises.paged.model';
import { isNullOrUndefined } from 'util';
import { MuscleGroup } from '../../shared/musclegroup.model';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ApiService {

  apiDomain = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  getExercises(payload: any, currentPageNumber, muscleGroupFilterParams: string[]) {

    // TODO IGNORE PAGING FOR NOW - just return all
    // if (isNullOrUndefined(currentPageNumber)) {
    //   currentPageNumber = 0;
    // } else {
    //    currentPageNumber ++;
    // }
    currentPageNumber = 0;

    let qString = '&filters=';

    // TODO - comma separated filters.
    muscleGroupFilterParams.forEach((mgroup, index) => {
      if (index === 0) {
        qString += mgroup;
      } else {
        qString += '&filters=' + mgroup;
      }
    });

    console.log('qstring', qString);

    let url = `${this.apiDomain}/exercises?page=${currentPageNumber}&size=200${qString}`; // + qString
    console.log('URL', url);

    return this.httpClient.get<ExercisesPaged>(url);

  }

  getAllMuscleGroups() {
    return this.httpClient.get<MuscleGroup[]>(`${this.apiDomain}/musclegroups`);
  }

  saveNewExercise(exercise) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.post(`${this.apiDomain}/exercises`, exercise , { responseType: 'json', headers: headers });
  }

  updateExercise(exercise) {
    console.log('ENDPOINT UPDATE', exercise);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.put(`${this.apiDomain}/exercises/${exercise.id}`, exercise, { responseType: 'json', headers: headers });
  }

  deleteExercise(exercise) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());

    // See https://stackoverflow.com/questions/46049082/how-to-add-a-body-to-angular-httpclient-delete-function
    return this.httpClient.request('delete', `${this.apiDomain}/exercises/${exercise.id}`, { body: exercise, headers: headers });
    // return this.httpClient.delete('http://localhost:8080/api/exercises/' + exercise.id, exercise);
  }






}
