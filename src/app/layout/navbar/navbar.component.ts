import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/core/services/shared.service';
import { IUser } from 'src/app/core/interfaces/iuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router : Router ,
     private fb : FormBuilder,
  
    ){
   
  }
  searchForm !: FormGroup
  
user !: IUser

  

  ngOnInit(): void {
    const user: IUser = JSON.parse(localStorage.getItem('user') as string);
   this.user = user;
  }



  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
