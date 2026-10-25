import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceSpy: \`jasmine.SpyObj<AuthService>\`;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['login', 'getToken', 'logout']);
    authServiceSpy = spy as jasmine.SpyObj<AuthService>;

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on submit', () => {
    component.username.set('testuser');
    component.password.set('testpass');
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(component.isLoading()).toBeFalse();
  });

  it('should set error message on failure', () => {
    component.username.set('testuser');
    component.password.set('testpass');
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Auth failed')));

    component.onSubmit();

    expect(component.errorMessage()).toBe('Invalid credentials');
    expect(component.isLoading()).toBeFalse();
  });
});
