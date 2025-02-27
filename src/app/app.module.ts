import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridUseComponent } from './ag-grid-use/ag-grid-use.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { HelloComponent } from './hello/hello.component';
import { FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

if ((window as any).ENABLE_PROD_MODE) {
  enableProdMode();
}


@NgModule({
  declarations: [
    AppComponent,
    AgGridUseComponent,
    HelloComponent,
    NewComponent,
    EmployeeFormComponent,
  ],
  imports: [
    AppRoutingModule,
    AgGridAngular,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    AgGridModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
