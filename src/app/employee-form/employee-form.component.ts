import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  @Output() employeeAdded = new EventEmitter<void>();

  employee = { firstName: '', lastName: '', email: '', position: '', salary: null };
  positions = ['Manager', 'Developer', 'Designer', 'QA'];
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post(this.apiUrl, this.employee).subscribe(() => {
      this.employeeAdded.emit();
      this.employee = { firstName: '', lastName: '', email: '', position: '', salary: null };
    });
  }
}