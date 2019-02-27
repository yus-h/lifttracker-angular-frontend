import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-set-rep-form',
  templateUrl: './set-rep-form.component.html',
  styleUrls: ['./set-rep-form.component.css']
})
export class SetRepFormComponent implements OnInit {

  @Input() weightAndRepsForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
