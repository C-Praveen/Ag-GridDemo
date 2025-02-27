import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry, NumberEditorModule } from 'ag-grid-community';
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
  NumberEditorModule,
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

  public rowSelection: 'single' | 'multiple'= 'multiple';
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field:"id" ,
      cellRenderer:(item:any)=>{
        return "RN"+ item.value;
      },
      headerCheckboxSelection:true,
      checkboxSelection:true ,
      filter: 'agNumberColumnFilter',
    },
  
    { field: "firstName",filter:'agTextColumnFilter',headerName:"FIRST NAME",},
    { field: "lastName", filter: 'agTextColumnFilter',},
    { field: "email",editable:true,filter: 'agTextColumnFilter',},
    { field: "position",editable:true,filter: 'agTextColumnFilter', },
    { field: "salary",editable:true,filter: 'agNumberColumnFilter', },
    // {
    //   headerName: 'Actions',
    //   cellRenderer: (event:any) => {
    //     return `<button (click)="deleteRow(${event.data.id})">Delete</button>`;
    //   }
    // },
  ];

  defaultColDef: ColDef = {
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
    editable:true 
  }
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }

  //Read
  getUser() {
    this.http.get("http://localhost:8080/api/employees").subscribe((res: any) => {
      this.userList = res;
    })
  }
  // https://jsonplaceholder.typicode.com/users

  //Update
  onCellValueChanged(event: any) {
    this.http.put(`http://localhost:8080/api/employees/${event.data.id}`, event.data)
      .subscribe(response => console.log('Data updated successfully'));
  }
  //Delete
  deleteSelectedRows() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length > 0) {
      if (confirm('Are you sure you want to delete the selected rows?')) {
        selectedData.forEach(row => {
          this.http.delete(`${"http://localhost:8080/api/employees"}/${row.id}`).subscribe(() => {
            this.getUser();
          });
        });
      }
    } else {
      alert('No rows selected');
    }
  }

  // deleteRow(id: number) {
  //   if (confirm('Are you sure you want to delete this row?')) {
  //     this.http.delete(`${"http://localhost:8080/api/employees"}/${id}`).subscribe(() => {
  //       this.getUser();
  //     });
  //   }
  // }

  deleteAllItems() {
    if (confirm('Are you sure you want to delete all rows?')) {
      this.http.delete("http://localhost:8080/api/employees").subscribe(() => {
        this.getUser();
      });
    }
  }

}