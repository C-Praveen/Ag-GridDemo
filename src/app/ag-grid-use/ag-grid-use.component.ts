import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { provideGlobalGridOptions } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community'; 
import { TextEditorModule } from 'ag-grid-community';
import { RowSelectionModule } from 'ag-grid-community';
import { PaginationModule } from 'ag-grid-community';

provideGlobalGridOptions({ theme: "legacy" });
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  TextEditorModule,
  RowSelectionModule,
  PaginationModule
]);

@Component({
  selector: 'app-ag-grid-use',
  standalone: false,
  templateUrl: './ag-grid-use.component.html',
  styleUrl: './ag-grid-use.component.css'
})
export class AgGridUseComponent implements OnInit {

  userList: any[] = [];

  private gridApi!: GridApi<any>;


  // rowData = [
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ];
  public rowSelection: 'single' | 'multiple'= 'multiple';
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field:"id" ,
      cellRenderer:(item:any)=>{
        return "RN"+ item.value;
      },
      headerCheckboxSelection:true,
      checkboxSelection:true 
    },
  
    { field: "firstName", floatingFilter: true, filter:'agTextColumnFilter',headerName:"FIRST NAME",},
    { field: "lastName", filter: 'agTextColumnFilter',},
    { field: "email",editable:true},
    { field: "position" },
    { field: "salary" }
  ];

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
  }
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.http.get("http://localhost:8080/api/employees").subscribe((res: any) => {
      this.userList = res;
    })
  }
  // https://jsonplaceholder.typicode.com/users

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }
  

}