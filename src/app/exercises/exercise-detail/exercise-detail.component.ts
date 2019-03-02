import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../shared/exercise.model';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {

  exercise: Exercise = {
    id: null,
    name: '' // prevents null in html string interpolation
  };


  constructor(private exerciseService: ExerciseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        console.log('clicked on id..', id);

        this.exerciseService.getExercise(id).subscribe(
          data => {
            this.exercise = data;
            console.log('clicked on exercise', this.exercise);
          },
          err => {
            console.log('Error occured.');
          });
      }
    );
  }

  onEditExercise() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
