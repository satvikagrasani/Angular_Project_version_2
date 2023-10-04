import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   // Handle form submission here
  //   console.log(this.employeeForm.value);
  // }
  onSubmit() {
    if (this.employeeForm.valid) {
      // Send the form data to the Express.js server
      console.log(this.employeeForm.value);
      this.http.post('http://localhost:3000/api/employeeInsert', this.employeeForm.value).subscribe(
        (response: any) => {
          console.log('Employee added successfully with ID:', response.id);
          // Optionally, you can navigate to a different view or show a success message.
          window.alert("Employee Added Sucessfully")
          // Reload the page
        window.location.reload();
        },
        (error) => {
          console.error('Error adding employee:', error);
          // Handle the error, display an error message, or redirect as needed.
        }
      );
    } else {
      // Handle form validation errors or display an error message to the user.
      console.error("Invalid form inputs");
    }
  }
  
}
