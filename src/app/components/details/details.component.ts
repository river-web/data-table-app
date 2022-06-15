import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;

  constructor(
    private service: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = Number(data['ID']);
  }

  ngOnInit(): void {
    this.service.getDetails(this.id).subscribe(
      (res: any) => {
        this.name = res.name;
        this.username = res.username;
        this.email = res.email;
        this.phone = res.phone;
        this.address = `${res.address.suite}, ${res.address.street}, ${res.address.city}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
