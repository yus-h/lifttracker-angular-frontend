import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { ExerciseService } from '../../exercises/exercise.service';
import { RoutineService } from '../routine.service';
// import moment = require('moment');
// import moment from 'moment';
// import moment from 'moment';
import moment from 'moment/src/moment';

/**
 * Submit form looks like: TBC routine ID.
 *  {
 *  [ {'exerciseId' : 1, 'reps':8, 'weight':60 }],
 *  [ {'exerciseId' : 1, 'reps':8, 'weight':60 }],
 *  }
 */
@Component({
  selector: 'app-routine-edit',
  templateUrl: './routine-edit.component.html',
  styleUrls: ['./routine-edit.component.css']
})
export class RoutineEditComponent implements OnInit {

  id: number;
  editMode = false;
  options = [{'id': 1, 'name': 'ABC'}, {'id': 22, 'name': 'DEF'}];
  selectedExerciseId: number;
  selectedExerciseName: string;
  public myForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private exerciseService: ExerciseService,
              private routineService: RoutineService) {
  }

  ngOnInit() {


    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        console.log('edit mode? ', this.editMode);


        // Initialise main form
        // TODO Date and notes, not name.
        // TODO probably need set ORDER before attemptint to edit to identify the correct field to edit.


        // Todays date
        const todaysDate = moment().format('YYYY-MM-DD');
        console.log('todaysDate', todaysDate);
        this.myForm = this.fb.group({
          notes: [''],
          date: [todaysDate],
          exercises: this.fb.array([]),
          routineId: ['']
        });


        // Query for exercises
        this.getExercisesListForDropdown();

        this.initForm();

        this.myForm.valueChanges.subscribe(x => {
          console.log('FORM CHANGEd', x);

        });

        this.myForm.controls['exercises'].valueChanges.subscribe(value => {
          console.log('exercises changed', value);
        });
      }
    );


    // TODO after
    // this.addExercise();
    // this.myForm.controls['exercises'].valueChanges.subscribe(x => {
    //   console.log('exercise changee', x);
    // });
  }

  getExercisesListForDropdown() {
    this.exerciseService.getExercisesAll().subscribe(
      data => {
        this.options = data.content;
        console.log('RETRIEVED EXERCISES', this.options);
      },
      err => {
        console.log('Error occured.');
      });
  }

  initExercise(exerciseId, exerciseName) {
    // NOTE: Returning a FormGroup here instead of a FormArray
    // Inside the specific form group we will add an array to it.
    // TODO routineId
    return this.fb.group({'exerciseId': exerciseId, 'exerciseName': exerciseName});
  }

  addExercise() {
    const control = <FormArray>this.myForm.controls['exercises'];
    console.log('selectedId: ' + this.selectedExerciseId);
    const addrCtrl = this.initExercise(this.selectedExerciseId, this.selectedExerciseName);

    control.push(addrCtrl);

    // addrCtrl.valueChanges.subscribe(x => {
    //   console.log('change', x);
    // });
  }

  removeExercise(i: number) {
    const control = <FormArray>this.myForm.controls['exercises'];
    control.removeAt(i);
  }

  onSubmit(): void {
    console.log(this.myForm.value);
    // Your form value is outputted as a JavaScript object.
    // Parse it as JSON or take the values necessary to use as you like
  }

  onDropdownChange($event) {
    console.log('drop down change', $event);
    this.selectedExerciseId = $event.id;
    this.selectedExerciseName = $event.name;
  }

  //
  // onAddExercise() {
  //   console.log('adding instance of exercise id ' + this.selectedExerciseId);
  //   // <FormArray>this.form.get('properties').push(new FormControl());
  //
  //
  // }

  saveForm(myForm: FormGroup) {
    console.log('SAVING FORM', myForm);


    if (this.editMode) {

      this.routineService.updateRoutine(myForm.value)
        .subscribe(
          // TODO how to differentiate between different status codes
          // TODO go to routine saved.
          // (res: Exercise) => {
          //   console.log('SUCCESS:');
          //   console.log(res);
          // this.exerciseService.notifySubscribersOfChange();
          // this.router.navigate(['../' + res.id], {relativeTo: this.route});
          // },

          (res) => {
            console.log('SUCCESS:');
            console.log(res);
            this.routineService.notifySubscribersOfChange();
            this.router.navigate(['../' + res], {relativeTo: this.activatedRoute});
            window.scrollTo(0, 0);
          },
          err => {
            console.log('Error occured', err);
          }
        );


    } else {

      this.routineService.addRoutine(myForm.value)
        .subscribe(
          // TODO how to differentiate between different status codes
          // TODO go to routine saved.
          // (res: Exercise) => {
          //   console.log('SUCCESS:');
          //   console.log(res);
          // this.exerciseService.notifySubscribersOfChange();
          // this.router.navigate(['../' + res.id], {relativeTo: this.route});
          // },

          (res) => {
            console.log('SUCCESS:');
            console.log(res);
            this.routineService.notifySubscribersOfChange();
            this.router.navigate(['../' + res], {relativeTo: this.activatedRoute});
            window.scrollTo(0, 0);
          },
          err => {
            console.log('Error occured', err);
          }
        );
    }


  }

  private initForm() {

    if (this.editMode) {
      this.routineService.getRoutineFormSubmission(this.id).subscribe(
        data => {
          console.log('########################');
          console.log('received form value', data);
          console.log('exercises', data.exercises);

          // update value of the form. NOTE: setValue here.
          // TODO interface?
          this.myForm.patchValue({
            'notes': data.notes,
            'routineId': data.routineId,
            'date': data.date
          });

          // SEE THIS https://stackoverflow.com/questions/41517389/angular-2-cant-add-form-group-to-form-array-in-reactive-forms
          // Populate the exercises array with a form group for each exercise
          data.exercises.forEach((e, i) => {
            (<FormArray>this.myForm.get('exercises')).push(this.fb.group({
              exerciseId: e.exerciseId,
              exerciseName: e.exerciseName,
              weightAndReps: this.fb.array([]) // important
            }));
            // each individual exercise has a weightAndReps array - make sure this is populated
            e.weightAndReps.forEach((we, j) => {
              ((<FormArray>(<FormArray>this.myForm.get('exercises')).at(i).get('weightAndReps')).push(this.fb.group({
                weight: we.weight,
                reps: we.reps
                // weightAndReps: []
              })));
            });
          });
        },
        err => {
          console.log('Error occured.', err);
        });
    }
  }

}
