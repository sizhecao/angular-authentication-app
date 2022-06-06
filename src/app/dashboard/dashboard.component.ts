import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  quote = "Loading quote..."
  email = "Loading email"
  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user.getData().subscribe(data => {
      if (data.status) {
        this.quote = data.quote
        this.email = data.email
      } else {
        this.router.navigate(['logout'])
      }
      
    })
  }

  updateQuote(event: any) {
    const value = event.target.parentNode.querySelector('#myQuote').value
    this.user.updateQuote(value).subscribe(data => {
      if (data.success) {
        alert("Successfully updated")
        location.reload()
      } else {
        alert("Update failed...")
      }
    })
  }

}
