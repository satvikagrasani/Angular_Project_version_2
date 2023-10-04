
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  employeeData: any; // This will hold the fetched employee data

  constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const employeeID = localStorage.getItem('ID');
    console.log(employeeID);

    if (employeeID) {

      let parsedEmployeeID = parseInt(employeeID, 10);

      this.http.get(`http://localhost:3000/api/employeeGet/${parsedEmployeeID}`).subscribe({
        next: (data) => {
          this.employeeData = data;
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching employee data:', error);
        }
      });

    } else {
      console.error('Employee ID from localStorage is null or undefined');
    }
  }


  logout(): void {
    const confirmation = window.confirm('Are you sure you want to log out?');
    if (confirmation) {
      localStorage.removeItem('ID');
      localStorage.removeItem('Token');

      // Log out the user
      this.authService.logout();

      this.router.navigate(['/login']);
    } else {
      console.log('Logout canceled by the user.');
    }
  }


}
