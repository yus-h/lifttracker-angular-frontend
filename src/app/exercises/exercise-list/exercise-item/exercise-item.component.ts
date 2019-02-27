import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../../../shared/exercise.model';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.css']
})
export class ExerciseItemComponent implements OnInit {

  @Input() exercise: Exercise;
  id: number;

  constructor() { }

  ngOnInit() {
    // console.log('EXERCISE:' , this.exercise);
    this.id = this.exercise.id;
  }

}
