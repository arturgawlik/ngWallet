import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApplicationHttpClient } from 'src/app/services/http/applicationHttpClientService.service';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  images =
    [
      'https://aadcdn.msauth.net/ests/2.1/content/images/backgrounds/0_a5dbd4393ff6a725c7e62b61df7e72f0.jpg',
      'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/395132/pexels-photo-395132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1123445/pexels-photo-1123445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1054222/pexels-photo-1054222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/831243/pexels-photo-831243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/196665/pexels-photo-196665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ];
  loggingWithFacebook = false;
  loggingWithGoogle = false;
  loggingWithEmailAndPass = false;
  loggingWithEmailAndPassError = false;
  registerErrorCom = false;
  registerProcessingCom = false;

  showSignUp = false;

  loginForm: FormGroup;

  get loginEmail(): AbstractControl {
    return this.loginForm.get('loginEmail');
  }
  get loginPassword(): AbstractControl {
    return this.loginForm.get('loginPassword');
  }

  constructor(private renderer: Renderer2,
    private authService: AuthService,
    private fb: FormBuilder,
    private httpClient: ApplicationHttpClient) {
    this.buildLoginForm();
  }

  ngOnInit() {
    const imageIndex = Math.floor(Math.random() * (this.images.length - 1));
    this.renderer.setStyle(document.body, 'background', `url(${this.images[imageIndex]}) no-repeat center center fixed`);
  }

  private buildLoginForm() {
    this.loginForm = this.fb.group({
      loginEmail: [''],
      loginPassword: ['']
    });
  }

  private setAllLoggingFlagsAsFalse() {
    this.loggingWithFacebook = false;
    this.loggingWithGoogle = false;
    this.loggingWithEmailAndPass = false;
    this.loggingWithEmailAndPassError = false;
    this.registerErrorCom = false;
    this.registerProcessingCom = false;
  }

  loginWithEmailAndPassword() {
    if (this.loginForm.valid) {
      this.authService.doLogin(this.loginEmail.value, this.loginPassword.value)
        .then(() => { // TODO
          this.httpClient.post('applicationUser/addApplicationUserIfNotExists', null).subscribe(res => console.log(res));
        })
        .catch(err => {
          console.error(err);
          this.setAllLoggingFlagsAsFalse();
          this.loggingWithEmailAndPassError = true;
        });
      this.setAllLoggingFlagsAsFalse();
      this.loggingWithEmailAndPass = true;
    } else {
      this.loginEmail.markAsTouched();
      this.loginPassword.markAsTouched();
    }
  }

  loginWithGoogle() {
    this.authService.doLoginWithGoogle()
      .then(() => { // TODO
        this.httpClient.post('applicationUser/addApplicationUserIfNotExists', null).subscribe(res => console.log(res));
      })
      .catch(err => {
        console.error(err);
        this.setAllLoggingFlagsAsFalse();
      });
    this.setAllLoggingFlagsAsFalse();
    this.loggingWithGoogle = true;
  }

  loginWithFacebook() {
    this.authService.doFacebookLogin()
      .then(() => { // TODO
        this.httpClient.post('applicationUser/addApplicationUserIfNotExists', null).subscribe(res => console.log(res));
      })
      .catch(err => {
        console.error(err);
        this.setAllLoggingFlagsAsFalse();
      });
    this.setAllLoggingFlagsAsFalse();
    this.loggingWithFacebook = true;
  }

  signUp() {
    this.setAllLoggingFlagsAsFalse();
    this.showSignUp = true;
  }

  reset() {
    this.setAllLoggingFlagsAsFalse();
    this.showSignUp = false;
  }

  registerError() {
    this.setAllLoggingFlagsAsFalse();
    this.registerErrorCom = true;
  }

  registerStart() {
    this.setAllLoggingFlagsAsFalse();
    this.registerProcessingCom = true;
  }

}
