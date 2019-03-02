import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-set-rep-form',
  templateUrl: './set-rep-form.component.html',
})
export class SetRepFormComponent implements OnInit {

  @Input() weightAndRepsForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
