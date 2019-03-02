import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './ngrx/index';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ExerciseEffects } from './ngrx/effects/exercises'; // Angular CLI environemnt
/**
 * @imports - import our custom modules including CoreModule
 *
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,

    StoreModule.forRoot(reducers, { metaReducers }),

    EffectsModule.forRoot([
      ExerciseEffects
    ]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly:  environment.production,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
