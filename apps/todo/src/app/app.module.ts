import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './todo/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/store/effects';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TodoModule,
    AuthModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot([todoReducer]),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
