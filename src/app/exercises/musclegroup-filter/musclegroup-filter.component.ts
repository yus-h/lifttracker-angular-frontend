import { Component, OnDestroy, OnInit } from '@angular/core';
import { MuscleGroup } from '../../shared/musclegroup.model';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-musclegroup-filter',
  templateUrl: './musclegroup-filter.component.html',
  styleUrls: ['./musclegroup-filter.component.css']
})
export class MusclegroupFilterComponent implements OnInit, OnDestroy {

  muscleGroups: MuscleGroup[];
  currentFilterParams = [];
  paramsSubscription: Subscription; //todo why no import not flagged

  constructor(private exerciseService: ExerciseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.exerciseService.getMuscleGroups().subscribe(
      (data: MuscleGroup[]) => {
        this.muscleGroups = data;
        console.log('retrieved muscle groups', this.muscleGroups);

      },
      err => {
        console.log('Error occured.');
      });


    this.paramsSubscription = this.route.queryParamMap.subscribe((params: any) => {

      // TODO does this logic need to be everywhere where notifySubscribersOfchange is called? - use ngrx? or just have logic in exercise-list?
      console.log('params!!!', params);

      this.currentFilterParams = [];
      if (params.params.filter === undefined) {

      } else if (!Array.isArray(params.params.filter)) {
          this.currentFilterParams.push(params.params.filter);
      } else if (Array.isArray(params.params.filter))  {
          Array.prototype.push.apply(this.currentFilterParams, params.params.filter);
      }


       // this.currentFilterParams = params.params.filter;
       console.log('filter params', this.currentFilterParams);
      // TODO check checkbox based on these filters

      // filter page based on these filters

      this.exerciseService.notifySubscribersOfChange(true);

    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  checkBoxChange($event: any, id: Number) {
    console.log('check box changed for ID ' + id, $event);
    console.log('is checked? ', $event.target.checked);

    // TODO Update route params
    // https://alligator.io/angular/query-parameters/
    // https://stackoverflow.com/questions/43700040/angular2-router-navigate-with-multivalued-query-params
    // https://stackoverflow.com/questions/42929173/how-to-pass-an-array-of-values-of-same-query-parameter-to-the-router
    // produces ?&filter=1&filter=2 etc.

    // TODO or is there a way to get state of all checkboxes without getting value from the URL
    let updatedFilterParams: any = this.currentFilterParams;
    console.log('#########  updated filter params', updatedFilterParams);
    console.log('current filter params', this.currentFilterParams);
    // If is checked
    //// If not in currentFilterParams - add it

    if ($event.target.checked === true) {
      if (!this.currentFilterParams.includes(id.toString())) {
        updatedFilterParams.push(id.toString());
      }
    } else {
      if (this.currentFilterParams.includes(id.toString())) {

        let index = updatedFilterParams.indexOf(id.toString());
        if (index > -1) {
          updatedFilterParams.splice(index, 1);
        }
      }

    }

    console.log('updated filter params', updatedFilterParams);
    // console.log('current filter params', this.currentFilterParams);

    // If not checked
    // If in currentFilterParams - remove it



    this.router.navigate(['q'], // todo stay same page
      { queryParams:
        // { filter: ['aa']},
      { filter: updatedFilterParams},
        // { filter: [id, 'aa', 'aa']},
        // { filter: updatedFilterParams},
        relativeTo: this.route
      }
      );

  }
}
