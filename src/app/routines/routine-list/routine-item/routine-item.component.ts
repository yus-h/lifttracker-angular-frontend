import { Component, Input, OnInit } from '@angular/core';
import { Routine } from '../../../shared/routine.model';

@Component({
  selector: 'app-routine-item',
  templateUrl: './routine-item.component.html',
})
export class RoutineItemComponent implements OnInit {

  @Input() routine: Routine;
  id: number;

  constructor() { }

  ngOnInit() {
    console.log('ROUTINE:' , this.routine);
    this.id = this.routine.id;
  }
}
