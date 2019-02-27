import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
  }

  onAddRoutine() {
    console.log('clicked');
  }
}
