import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Define an interface for employee data
interface Employee {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  date_of_birth: Date;
  address: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['fullName', 'contact', 'email', 'dob', 'address'];

  private apiUrl = 'http://localhost:3000/api/employeesGet'; // Replace with your API endpoint URL

  constructor(private http: HttpClient,  private router : Router ) {}

  ngOnInit(): void {
    // Fetch employee data and assign it to the dataSource
    this.getEmployees().subscribe((data: Employee[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

}
