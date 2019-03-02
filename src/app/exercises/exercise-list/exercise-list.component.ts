import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../../shared/exercise.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../ngrx';
import { GetExercises, ResetPaging } from '../../ngrx/actions/exercises';
import { Observable } from 'rxjs/index';
import { selectFilters, selectList } from '../../ngrx/index';
import { withLatestFrom } from 'rxjs/internal/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent implements OnInit, OnDestroy {

  lastPage = false;
  exercises: Exercise[];

  exercisesObservable$: Observable<any>;
  exercisesSubscription;


  filtersObservable$: Observable<any>;
  filtersSubscription;

  constructor(private exerciseService: ExerciseService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRoot.State>,) {
  }

  ngOnInit() {

    this.getExercisesCall(true);

    // TODO - need to show results once changed from new/ediit
    // Watch for the results changing
    this.exercisesObservable$ = this.store.pipe(select(selectList));
    this.exercisesSubscription = this.exercisesObservable$
      .pipe(withLatestFrom(this.store))
      .subscribe(([res, store]) => {
          this.exercises = isNullOrUndefined(this.exercises) ? this.exercises = res : this.exercises = this.exercises.concat(res);
          if (store && store['exercises'] && store['exercises'].lastPage) {
            this.lastPage = true;
          }
        }
      );


    // Watch for the filters changing
    this.filtersObservable$ = this.store.pipe(select(selectFilters));
    this.filtersSubscription = this.filtersObservable$
      .subscribe((res) => {
          // New call with reset paging
          this.getExercisesCall(true);
        }
      );

  }


  getExercisesCall(resetPaging) {
    if (resetPaging) {
      this.store.dispatch(new ResetPaging());
      this.exercises = [];
      this.lastPage = false;
    }

    this.store.dispatch(new GetExercises({}));
  }


  ngOnDestroy() {
    if (this.exercisesSubscription) { this.exercisesSubscription.unsubscribe() }
    if (this.filtersSubscription) { this.filtersSubscription.unsubscribe() }
  }

  onLoadMore() {
    this.getExercisesCall(false);

  }
}
