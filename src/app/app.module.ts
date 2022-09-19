import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

import { JourneyComponent } from './views/journey/journey.component';
import { HomeComponent } from './views/home/home.component';
import { ConvertCurrencyPipe } from './pipe/convert-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    JourneyComponent,
    HomeComponent,
    ConvertCurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule
  ],
  providers: [
    ConvertCurrencyPipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
