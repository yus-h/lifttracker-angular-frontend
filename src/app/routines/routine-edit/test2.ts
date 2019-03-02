import { Component, NgModule, Input, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <div [formGroup]='myForm'>
      <h3>Nested FormGroup</h3>
      <button (click)="addNewControl()">Add control</button>
      <div formArrayName="subcontrols">
        <div *ngFor="let subcontrol of myForm.controls.subcontrols.controls; let i=index">
          ###############################################################################
          <div class="panel-heading">
            <span>subControl {{i + 1}}</span>
          </div>
          <div class="panel-body" [formGroupName]="i">
            <app-single-exercise-form [subForm]="myForm.controls.subcontrols.controls[i]"></app-single-exercise-form>
          </div>
        </div>
      </div>

      BASE FORM VALUES:
      <pre>Form Values: {{myForm.value | json}}</pre>
    </div>
  `,
})
export class App implements OnInit {
  myForm: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      subcontrols: this.fb.array([])
    });

    this.addNewControl();
  }

  addNewControl() {
    const control = <FormArray>this.myForm.controls['subcontrols'];
    const addrCtrl = this.initControl();
    control.push(addrCtrl);
  }

  /** I think this is the issue - what should this be? **/
  initControl() {
    return this.fb.array([]);
  }

}

@Component({
  selector: 'app-single-exercise-form3',
  template: `
  <div [formGroup]='subForm'>
    <div *ngFor="let exercise of subForm.controls.subOptions.controls; let i=index">
      <app-option [optionForm]="subForm.controls.subOptions.controls[i]"></app-option>
     </div>
     <hr/>
    <a (click)='addOptions()' style='cursor: default'>
      Click to add a new option +
    </a>
    <br><br>
    MINI FORM VALUES:
    <pre>Form Values: {{subForm.value | json}}</pre>
  </div>`,
})
export class AppChild implements OnInit {

  @Input() subForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.subForm = this.fb.group({
      subOptions: this.fb.array([])
    });

    this.addOptions();
  }

  addOptions() {
    const control = <FormArray>this.subForm.controls['subOptions'];
    const addrCtrl = this.initOption();
    control.push(addrCtrl);
  }

  initOption() {
    return this.fb.group({
      option1: ['']
    });
  }

}


@Component({
  selector: 'app-option',
  template: `

<div [formGroup]="optionForm">
  <div class="row">

  <div class="form-group col-xs-6">
    <label>option1</label>
    <input type="text" class="form-control" formControlName="option1">
  </div>
  </div>
</div>

  `,
})
export class AppOption {

  @Input() optionForm: FormGroup;


}

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ App, AppChild, AppOption ],
  bootstrap: [ App ]
})
export class AppModule {}
