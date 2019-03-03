import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../../shared/exercise.model';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../ngrx';
import { singleExerciseStatus } from '../../ngrx/index';
import { withLatestFrom } from 'rxjs/internal/operators';
import { isNullOrUndefined } from 'util';
import { StateSaveStatus } from '../../shared/enums/StateSaveStatus';
import { GetSingleExercise } from '../../ngrx/actions/exercises';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {

  exercise: Exercise = {
    id: null,
    name: '' // prevents null in html string interpolation
  };

  getSingleExerciseObservable$: Observable<any>;
  getSingleExerciseSubscription;



  constructor(private exerciseService: ExerciseService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        console.log('clicked on id..', id);
        this.store.dispatch(new GetSingleExercise(id));
      }
    );

    // Watch for get single exercise
    this.getSingleExerciseObservable$ = this.store.pipe(select(singleExerciseStatus));
    this.getSingleExerciseSubscription = this.getSingleExerciseObservable$
      .pipe(withLatestFrom(this.store))
      .subscribe(([res, store]) => {

          if (!isNullOrUndefined(res) && res === StateSaveStatus.SAVE_SUCCESSFUL) {

            let localExercise: Exercise;
            localExercise =  store['exercises'].savedExercise;
            this.exercise = localExercise;
          }
        }
      );
  }

  onEditExercise() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.getSingleExerciseSubscription) { this.getSingleExerciseSubscription.unsubscribe(); }
  }
}
