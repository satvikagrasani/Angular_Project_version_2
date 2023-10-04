import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making API requests





@Component({
  selector: 'app-empedit',
  templateUrl: './empedit.component.html',
  styleUrls: ['./empedit.component.css']
})
export class EmpeditComponent implements OnInit {

  employeeForm: FormGroup;
  employeeId: number;

  private apiUrl = 'http://localhost:3000/api/employeesGet'; // Replace with your API endpoint URL

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient // Inject HttpClient for making API requests
  ) {}

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id'); // Get the employee ID from the URL parameter
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required]
    });

    // Load the employee data for editing
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    // Fetch the employee data by ID from your API and populate the form fields
    this.http.get(`http://localhost:3000/api/employeeGet/${this.employeeId}`).subscribe((employee: any) => {
      this.employeeForm.patchValue(employee); // Assuming your API response matches the form controls
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      // Send the updated form data to your Express.js server for updating the employee
      this.http.put(`http://localhost:3000/api/employees/${this.employeeId}`, this.employeeForm.value).subscribe(
        () => {
          console.log('Employee updated successfully');
          // Optionally, you can navigate to a different view or show a success message.
          window.alert('Updated Successfully');
          this.router.navigate(['']); // Example navigation to the employee list page
        },
        (error) => {
          console.error('Error updating employee:', error);
          // Handle the error, display an error message, or redirect as needed.
        }
      );
    } else {
      // Handle form validation errors or display an error message to the user.
      console.error('Invalid form inputs');
    }
  }
}
