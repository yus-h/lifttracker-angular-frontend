import { Component, OnDestroy, OnInit } from '@angular/core';
import { Routine } from '../../shared/routine.model';
import { RoutineService } from '../routine.service';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css']
})
export class RoutineListComponent implements OnInit, OnDestroy {

  routines: Routine[];
  private subscription;


  constructor(private routineService: RoutineService) {
  }

  ngOnInit() {
    console.log('ng init list');
    // initial initialisation of page on component load
    this.updateList();

    // Listen if the routine list has been changed
    this.subscription = this.routineService.routinesChanged.subscribe(
      (res: string) => {
        console.log('updated list', res);
        this.updateList();
      }
    );


  }

  updateList() {

    console.log('UPDATING LIST');
    this.routineService.getRoutines().subscribe(
      data => {
        this.routines = data;
        console.log('ROUTINES', this.routines);
      },
      err => {
        console.log('Error occured.');
      });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
