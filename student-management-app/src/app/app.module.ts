import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnListComponent } from './features/alumn-list/components/alumn-list/alumn-list.component';
import { MainComponent } from './features/main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AlumnInfoComponent } from './features/alumn-info/components/alumn-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnCardComponent } from './features/alumn-list/components/alumn-card/alumn-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { StrengthBarComponent } from './features/alumn-info/components/strength-bar/strength-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { EncryptService } from '../app/features/util/services/encrypt.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AlumnListComponent,
    AlumnInfoComponent,
    AlumnCardComponent,
    StrengthBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule
  ],
  exports:[],
  providers: [EncryptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
