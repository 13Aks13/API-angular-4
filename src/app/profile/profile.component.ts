import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { AuthenticationService } from '../services/authentication.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';

import { User } from '../models/user';
import { Location } from '../models/location';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: User;
    locations: Location[] = [];
    selectedLocation: Location;
    profileForm: FormGroup;
    ready: boolean = false;

    constructor(
        private titleService: Title,
        private formBuilder: FormBuilder,
        private locationService: LocationService,
        private authenticationService: AuthenticationService,
        private userService: UserService,

    ) { }

    doSomeActionOnOpen() {

    }

    doSomeActionOnClose(location: Location) {
        this.selectedLocation = location;
        console.log(this.selectedLocation);
    }

    ngOnInit() {
        this.userService.getUserByToken(this.authenticationService.token).then((response) => {
            this.user = response;
            this.locationService.getLocations(this.authenticationService.token).then((res) => {
                this.locations = res;
                console.log(this.locations);

                this.buildRegisterForm();
            });
        });

    }

    selectItem(value) {
        console.log('Location:', value);
    }

    buildRegisterForm(): void {
        this.profileForm = this.formBuilder.group(
            {
                'first_name': [this.user.first_name, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(10),
                    Validators.pattern(/^[a-z0-9_]*$/i)]
                ],
                'last_name': [this.user.last_name, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(10),
                    Validators.pattern(/^[a-z0-9_]*$/i)]
                ],
                'email': [this.user.email, [
                    Validators.required,
                    Validators.email       ]
                ],
                'phone': [this.user.phone, []
                ],
                'skype': [this.user.skype, []
                ],
                'location': [this.user.location, []
                ],
            }
        );

        this.profileForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        this.ready = true;
    }

    onValueChanged(data ?: any) {
        if (!this.profileForm) { return; }
        const form = this.profileForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone': '',
        'skype': '',
    };

    validationMessages = {
        'first_name': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 5 characters long.',
            'maxlength': 'Username cannot be more than 10 characters long.',
            'pattern': 'Username can contain only letters, number and "_" symbol.'
        },
        'last_name': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 5 characters long.',
            'maxlength': 'Username cannot be more than 10 characters long.',
            'pattern': 'Username can contain only letters, number and "_" symbol.'
        },
        'email': {
            'required': 'Email is required.',
            'email': 'Please type a valid email.'
        }
    };

    save(form: any) {
        console.log(form.value);
    }
}


