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
  selector: 'app-empaction',
  templateUrl: './empaction.component.html',
  styleUrls: ['./empaction.component.css']
})
export class EmpactionComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['fullName', 'contact', 'email', 'dob', 'address', 'action'];

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

  editEmployee(employee: any) {
  // Navigate to the edit-employee route with the employee's ID
  this.router.navigate(['empedit', employee.id]);
  }

  
  
   // Delete an employee
   deleteEmployee(employee: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`);
    
    if (confirmDelete) {
      // Send a delete request to the server
      this.http.delete(`http://localhost:3000/api/employeeDelete/${employee.id}`).subscribe(
        () => {
          console.log('Employee deleted successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting employee:', error);
          // Handle the error, display an error message, or redirect as needed.
        }
      );
    }
}
}
