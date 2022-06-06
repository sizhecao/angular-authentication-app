import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  email: string, 
  status: boolean,
  quote: string
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

interface quoteStatus {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<myData>('/api/data')
  }

  isLoggedIn() {
    return this.http.get<isLoggedIn>('/api/isloggedin')
  }

  logout() {
    return this.http.get<logoutStatus>('/api/logout')
  }

  updateQuote(value: any) {
    return this.http.post<quoteStatus>('/api/quote', {
      value
    })
  }
}
