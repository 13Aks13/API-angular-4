import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

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
    model: any = {};
    user: User;
    locations: Location[] = [];
    profileForm: FormGroup;
    ready: boolean = false;

    // URLs to web api
    private domain = this.authenticationService.domain;
    private avatarUrl = 'avatar';

    constructor(
        private http: Http,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private locationService: LocationService,
        private authenticationService: AuthenticationService,
        private userService: UserService,

    ) {
        this.locationService.getLocations(this.authenticationService.token).then((res) => {
            this.locations = res;
        });
    }


    ngOnInit() {
        this.userService.getUserByToken(this.authenticationService.token).then((response) => {
            this.user = response;
            if (this.user.avatar) {
                this.model.avatar = this.user.avatar;
            }
            this.titleService.setTitle('Profile');
            this.buildRegisterForm();
        });
    }

    // Location select
    selectItem(location) {
        this.user.location.id = location.id;
        this.user.location.title = location.title;
    }

    getBase64(file): any {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log('File on base64: ', reader.result);
            return(reader.result);
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    // File to upload
    fileUpload(event) {
        console.log(event.target.files);
        const fileList: FileList = event.target.files;
        if ( fileList.length > 0 ) {
            const file: File = fileList[0];
            // const formData: FormData = new FormData();
            // formData.append('uploadFile', this.getBase64(file), file.name);
            const self = this;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                console.log('File on base64: ', reader.result);
                const url = `${self.domain}/${self.avatarUrl}`;
                const headers = new Headers({ 'Authorization': 'Bearer ' + self.authenticationService.token });
                // headers.append('Content-Type', 'multipart/form-data');
                // headers.append('Accept', 'application/json');
                const options = new RequestOptions({ headers: headers });
                console.log('id:', self.user.id);
                self.http.post(url, { id: self.user.id, avatar: reader.result }, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(error))
                    .subscribe(
                        data => console.log('success'),
                        error => console.log(error)
                    );
            };
        }
    }

    buildRegisterForm(): void {
        this.profileForm = this.formBuilder.group(
            {
                'avatar': [this.user.avatar, []
                ],
                'first_name': [this.user.first_name, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(25),
                    Validators.pattern(/^[a-z0-9_]*$/i)]
                ],
                'last_name': [this.user.last_name, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(25),
                    Validators.pattern(/^[a-z0-9_]*$/i)]
                ],
                'email': [this.user.email, [
                    Validators.required,
                    Validators.email       ]
                ],
                'birthday': [this.user.birthday, []
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
    };

    validationMessages = {
        'first_name': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 3 characters long.',
            'maxlength': 'Username cannot be more than 25 characters long.',
            'pattern': 'Username can contain only letters, number and "_" symbol.'
        },
        'last_name': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 3 characters long.',
            'maxlength': 'Username cannot be more than 25 characters long.',
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


