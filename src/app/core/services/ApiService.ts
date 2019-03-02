import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExercisesPaged } from '../../shared/exercises.paged.model';
import { isNullOrUndefined } from 'util';
import { MuscleGroup } from '../../shared/musclegroup.model';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  getExercises(payload: any, currentPageNumber, muscleGroupFilterParams: string[]) {

    if (isNullOrUndefined(currentPageNumber)) {
      currentPageNumber = 0;
    } else {
       currentPageNumber ++;
    }

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

    let url = `http://localhost:8080/api/exercises?page=${currentPageNumber}&size=3${qString}`; // + qString
    console.log('URL', url);

    return this.httpClient.get<ExercisesPaged>(url);

  }

  getAllMuscleGroups() {
    return this.httpClient.get<MuscleGroup[]>('http://localhost:8080/api/musclegroups');
  }



}
