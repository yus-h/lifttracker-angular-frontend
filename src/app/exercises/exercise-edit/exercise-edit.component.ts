import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../../shared/exercise.model';


@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  id: number;
  editMode = false;
  form: FormGroup;
  // exerciseName = 'as';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService) {
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
  }

  private onSubmit() {
    console.log('FORM SUBMITTED');
    console.log(this.form);
    console.log(this.form.value);
    console.log(this.id);

    // TODO - can we map this object to a model?
    if (this.editMode) {
      this.exerciseService.updateExercise(this.form.value)
        .subscribe(
        (res: Exercise) => {
          console.log('UPDATE SUCCESS:', res);
          this.exerciseService.notifySubscribersOfChange(false);
          this.router.navigate(['../../' + res.id], {relativeTo: this.route});
        },
        err => {
          console.log('Error occured', err);
        }
      );

    } else {
      this.exerciseService.addExercise(this.form.value)
        .subscribe(
          // TODO how to differentiate between different status codes
          (res: Exercise) => {
          console.log('SUCCESS:');
          console.log(res);
            this.exerciseService.notifySubscribersOfChange(false);
            this.router.navigate(['../' + res.id], {relativeTo: this.route});
        },
        err => {
          console.log('Error occured', err);
        }
      );
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
