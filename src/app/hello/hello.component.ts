import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: false,
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  selectedType: string = 'Cat';
  result: any;

  constructor(private http: HttpClient) {}

  enterData() {
    console.log('Fetching data for type:', this.selectedType);
    this.http.get<any>(`http://localhost:8080/getData?type=${this.selectedType}`).subscribe(
      data => {
        console.log('Data received:', data);
        if (this.selectedType === 'Cat') {
          this.result = `Breed: ${data.breed}, Color: ${data.color}, Sound: ${data.sound}`;
        } else if (this.selectedType === 'Rat') {
          this.result = `Breed: ${data.breed}, Color: ${data.color}`;
        }
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
}