import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-single-exercise-form',
  templateUrl: './single-exercise-form.component.html',
})
export class SingleExerciseFormComponent implements OnInit {

  @Input() exerciseForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private activatedRoute: ActivatedRoute) { }
  editMode = false;

  ngOnInit() {
    /*
      This should have a FormGroup from above. So all we do here is add a control to it,
      Instead of like below - which reinitialises it?
      this.exerciseForm = this._fb.group({
      setsAndReps: this._fb.array([])

      https://stackoverflow.com/questions/47889608/angular-dynamically-created-nested-reactive-form-how-to-get-child-form-values
    })
     */

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;

        console.log('edit mode child component? ', this.editMode);

        this.exerciseForm.addControl('weightAndReps', this._fb.array([]));

        if (!this.editMode) {
          this.addSet();
        }

      }
    );



  }

  initSet() {

    // TODO detect setOrder changes when deleting sets - OR NOT important? Just parse it from the server side.

    return this._fb.group({
      weight: ['', Validators.required],
      reps: [''],
      setOrder: ['']
    });
  }

  addSet() {
    const control = <FormArray>this.exerciseForm.controls['weightAndReps'];
    const addrCtrl = this.initSet();

    control.push(addrCtrl);
  }


  removeSet(i: number) {
    console.log('removing set');
    const control = <FormArray>this.exerciseForm.controls['weightAndReps'];
    control.removeAt(i);
  }

}
