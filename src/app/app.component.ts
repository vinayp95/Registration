import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  title = "Vinay";
  registerForm: FormGroup;
  submitted = false;

  error_messages = {
    firstname: [{ type: "required", message: "First Name is required." }],

    lastname: [{ type: "required", message: "Last Name is required." }],
    phone: [
      { type: "required", message: "Phone number required." },
      { type: "pattern", message: "Please enter minimum 10 digits" }
    ],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email address" }
    ],

    password: [
      { type: "required", message: "password is required." },
      { type: "minlength", message: "Password must be at least 6 characters" },
      { type: "pattern", message: "Invalid Password" }
    ],
    confirmpassword: [
      { type: "required", message: "confirmpassword is required." }
    ]
  };

  constructor(public fb: FormBuilder) {
    this.registerForm = new FormGroup(
      {
        firstname: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        lastname: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        phone: new FormControl("", Validators.compose([
          Validators.required, 
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
          Validators.minLength(10)])
        ),
        email: new FormControl("", Validators.compose([
            Validators.required,
            Validators.email,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ])
        ),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}"),
          Validators.minLength(6),
        ])),
        confirmpassword: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])),
      },
      this.passwordsMatchValidator
    );
  }

  ngOnInit() { }

  passwordsMatchValidator(formGroup: FormGroup) {
    const { value: password } = formGroup.get("password");
    const { value: confirmPassword } = formGroup.get("confirmpassword");
    console.log(password);
    console.log(confirmPassword);
    return password === confirmPassword ? { 'password_mismatch': '' } : { 'password_mismatch': "Password mismatch" };
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
  }
}
