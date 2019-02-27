import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../../shared/exercise.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {

  lastPage = false;
  pageNumber = 0;
  exercises: Exercise[];
  private subscription: Subscription;


  constructor(private exerciseService: ExerciseService,
              private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router
  ) {
  }

  ngOnInit() {

    // TODO doesnt detect changes

    // console.log('ng init list');
    // initial initialisation of page on component load
    this.updateList(true);

    // Listen if the exercise list has been changed
    this.subscription = this.exerciseService.exercisesChanged.subscribe(
      (resetPaging) => {
        console.log('updated list@@@@@@@@@@@@@@', resetPaging);
        this.updateList(resetPaging); // TODO TBC want to do from 0 to pageNumber?
      }
    );


    // this.route.params.subscribe(
    //   (params: Params) => {
    //     // console.log('list params', params);
    //     console.log('list params');
    //
    //   }
    // );


  }

  //  TODO potentially pass in object
  updateList(resetPaging) {

    /**if (!Array.isArray(array) || !array.length) {
      // array does not exist, is not an array, or is empty
    } else {
      // Array set to a new filter, therefore
      // this.pageNumber = 0;

    }**/

    const muscleFilterParams = this.route.snapshot.queryParams['filter'];
    console.log('exercist list filter snapshot', muscleFilterParams);


    const currentFilterParams = [];
    if (muscleFilterParams === undefined) {

    } else  if (!Array.isArray(muscleFilterParams)) {
      currentFilterParams.push(muscleFilterParams);
    } else if (Array.isArray(muscleFilterParams))  {
      Array.prototype.push.apply(currentFilterParams, muscleFilterParams);
    }

    if (resetPaging) {
      this.pageNumber = 0;
      this.exercises = [];
      this.lastPage = false;

    }


    // console.log('UPDATING LIST - GETTING PAGE ' + this.pageNumber);
    this.exerciseService.getExercises2(this.pageNumber, currentFilterParams).subscribe(
      data => {
        // console.log('Exercised Page Data:', data);
        const returnedExercises = data.content;
        // console.log('Exercises List PRE CONCAT', this.exercises)

        if (this.exercises === undefined) {
          this.exercises = returnedExercises;
        } else {
          this.exercises = this.exercises.concat(returnedExercises);
        }

        // console.log('Exercises List POST CONCAT', this.exercises)
        if (data.last === true) {
          this.lastPage = true;
        }
        this.pageNumber ++;
        // console.log('Page number is now ' + this.pageNumber);
        // console.log('last page? ' + this.lastPage);
      },
      err => {
        // console.log('Error occured.');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLoadMore() {
    // console.log('pageNumber', this.pageNumber);
    this.updateList(false);
  }
}
