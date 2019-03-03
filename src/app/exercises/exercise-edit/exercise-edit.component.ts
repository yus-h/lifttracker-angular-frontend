import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../../shared/exercise.model';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../ngrx';
import {
  GetExercises,
  SaveNewExercise, SaveNewExerciseResetLoadingState, UpdateExercise,
  UpdateExerciseResetLoadingState
} from '../../ngrx/actions/exercises';
import { Observable } from 'rxjs/index';
import { savedExerciseStatus, selectCurrentExercise, updateExerciseStatus } from '../../ngrx/index';
import { isNullOrUndefined } from 'util';
import { withLatestFrom } from 'rxjs/internal/operators';
import { StateSaveStatus } from '../../shared/enums/StateSaveStatus';


@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
})
export class ExerciseEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  form: FormGroup;
  // exerciseName = 'as';



  newExerciseSaveObservable$: Observable<any>;
  newExerciseSaveSubscription;

  updateExerciseSaveObservable$: Observable<any>;
  updateExerciseSaveSubscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        // initial form
        this.form = new FormGroup({
          'name': new FormControl('', Validators.required),
          'id': new FormControl(null)
        });

        // means we reloaded page
        this.initForm();
      }
    );

    this.setupObservables();
  }

  private setupObservables() {
    // Watch for new exercise being saved
    this.newExerciseSaveObservable$ = this.store.pipe(select(savedExerciseStatus));
    this.newExerciseSaveSubscription = this.newExerciseSaveObservable$
      .pipe(withLatestFrom(this.store))
      .subscribe(([res, store]) => {
          if (!isNullOrUndefined(res) && res === StateSaveStatus.SAVE_SUCCESSFUL) {
            this.store.dispatch(new SaveNewExerciseResetLoadingState());
            console.log('CURRENT CHANGED', res);
            this.router.navigate(['../' + store['exercises'].savedExercise.id], {relativeTo: this.route});
            this.store.dispatch(new GetExercises({}));

          }
        }
      );


    // Watch for exercise being edited
    this.updateExerciseSaveObservable$ = this.store.pipe(select(updateExerciseStatus));
    this.updateExerciseSaveSubscription = this.updateExerciseSaveObservable$
      .pipe(withLatestFrom(this.store))
      .subscribe(([res, store]) => {
          if (!isNullOrUndefined(res) && res === StateSaveStatus.SAVE_SUCCESSFUL) {
            console.log('EXERCISE UPDATED', res)
            this.store.dispatch(new UpdateExerciseResetLoadingState());
            this.router.navigate(['../../' + store['exercises'].savedExercise.id], {relativeTo: this.route});
            this.store.dispatch(new GetExercises({}));
          }
        }
      );

  }

  private onSubmit() {
    console.log('FORM SUBMITTED');
    console.log(this.form);
    console.log(this.form.value);
    console.log(this.id);

    // TODO - can we map this object to a model?
    if (this.editMode) {
      this.store.dispatch(new UpdateExercise(this.form.value));
    } else {
      this.store.dispatch(new SaveNewExercise(this.form.value));
    }

    this.editMode = false;
    this.form.reset();
  }



  private initForm() {

    // Get exercise name from server
    if (this.editMode) {
      let localExercise: Exercise;
      this.exerciseService.getExercise(this.id).subscribe(
        data => {
          localExercise = data;
          const exerciseName = localExercise.name;

          // update value of the form. NOTE: setValue here.
          this.form.setValue({
            'name': exerciseName,
            'id': localExercise.id
          });
        },
        err => {
          console.log('Error occured.', err);
        });
    }


  }

  ngOnDestroy() {
    if (this.newExerciseSaveSubscription) {this.newExerciseSaveSubscription.unsubscribe();}
    if (this.updateExerciseSaveSubscription) { this.updateExerciseSaveSubscription.unsubscribe();}
  }

  private onCancel() {
    console.log('CLEARING FORM');
    this.router.navigate(['../'], {relativeTo: this.route});
    // this.editMode = false;
    // this.form.reset();
  }

  onDelete() {

    console.log('going to delete', this.form.value);

    this.exerciseService.deleteExercise(this.form.value)
      .subscribe(
        (res) => {
          console.log('DELETE SUCCESS:', res);
          this.exerciseService.notifySubscribersOfChange(false);
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        err => {
          console.log('Error occured', err);
        }
      );

  }
}
