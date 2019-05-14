import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers():void{    
    this.userService.getHeroes().subscribe(u=> this.users=u);
  }
}
