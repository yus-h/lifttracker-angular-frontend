import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Routine } from '../shared/routine.model';
import { RoutineFormSubmission } from '../shared/routine-form-submission.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs/index';

@Injectable()
export class RoutineService {

  // TODO should this be a different/better type than string?
  routinesChanged = new Subject<String>();

  constructor(private httpClient: HttpClient,
              private authService: AuthService
  ) {}

  // TODO how to do constants
  // TODO different endpoint for form submission?
  addRoutine(routine) {

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    // note needs to be inline:
    // https://stackoverflow.com/questions/47761262/angular-4-5-httpclient-argument-of-type-string-is-not-assignable-to-body
    return this.httpClient.post('http://localhost:8080/api/routines', routine, { responseType: 'json', headers: headers });

  }

  updateRoutine(routine) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const options =  {
      headers: headers
    };
    return this.httpClient.put('http://localhost:8080/api/forms/routines/' + routine.routineId, routine, options);
  }

  getRoutines() {

    const token = this.authService.getToken();
    console.log('getting routines - current token ', token);

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const options =  {
      headers: headers
    };

    return this.httpClient.get<Routine[]>('http://localhost:8080/api/routines', options);
  }

  getRoutineFormSubmission(id: number) {

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const options =  {
      headers: headers
    };
    return this.httpClient.get<RoutineFormSubmission>('http://localhost:8080/api/forms/routines/' + id, options);
  }

  notifySubscribersOfChange() {
    console.log('notifying of change');
    this.routinesChanged.next('CHANGED');
  }
}
