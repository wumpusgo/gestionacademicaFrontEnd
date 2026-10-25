import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and store token', () => {
    const user = new User();
    user.Username = 'test';
    user.Password = 'password';

    service.login(user).subscribe();

    const req = httpMock.expectOne('http://localhost:5201/api/Auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'fake-token' });

    expect(localStorage.getItem('auth_token')).toBe('fake-token');
  });

  it('should return token', () => {
    localStorage.setItem('auth_token', 'fake-token');
    expect(service.getToken()).toBe('fake-token');
  });

  it('should remove token on logout', () => {
    localStorage.setItem('auth_token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
