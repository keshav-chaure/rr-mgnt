import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user :User;
  constructor(private route:ActivatedRoute,
              private userService: UserService,
              private location: Location) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.userService.getUser(id)
      .subscribe(u=>this.user=u);

  }

  save(): void {
    console.log(this.user);
    this.user.userPassword="password";
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }
  goBack(): void{
    this.location.back();
  }


}
