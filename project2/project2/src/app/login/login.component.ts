import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 

  employeeForm: FormGroup;

  first_name: string | undefined;
  date_of_birth: string | undefined;
  employees: any[] | undefined;
  errorMessage: string | undefined;
  private employeeSubscription: Subscription | undefined; // Declare a private Subscription
  token: string | undefined; // Declare 'token' as a class property

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService // Inject the service
  ) { }

  ngOnInit(): void {
    this.first_name = '';
    this.date_of_birth = '';
    this.errorMessage = '';
    this.token = undefined; // Initialize 'token' here if needed
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      date_of_birth: ['', Validators.required]
    });
  }

  onSubmit(): void{
    if (this.employeeForm.valid) {
      // Get the values from the form
      const { first_name, date_of_birth } = this.employeeForm.value;

      // Make an HTTP GET request to your Express.js endpoint
      this.http.get(`http://localhost:3000/api/employeeGetByNameAndDOB/${first_name}/${date_of_birth}`).subscribe(
        (employee: any) => {
          if (employee) {
            const { id, first_name, last_name, email, phone_number, date_of_birth } = employee;
            console.log(`Employee ID: ${id}, Name: ${first_name} ${last_name}`);
            localStorage.setItem('ID', id);
            this.token = "2b2t"; // Generate a random token and assign it to 'token'
            console.log('Generated Token:', this.token);
            localStorage.setItem('Token', this.token);

             // Log in the user
            this.authService.login();

            this.router.navigate(['welcome']);
          } else {
            this.errorMessage = 'No matching records found.';
          }
        },
        (error) => {
          console.error('Error fetching employee:', error);
          this.errorMessage = 'Internal server error.';
        }
      );
    }
  }


  ngOnDestroy() {
    // Ensure that the subscription is unsubscribed when the component is destroyed.
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
}
