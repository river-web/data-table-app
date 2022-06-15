import { UsersService } from './../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];
  public dataSource: any;
  public errorMsg: any;
  public count: any;

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private service: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.getList().subscribe(
      (res: {}) => {
        this.dataSource = new MatTableDataSource<Users>(res as Users[]);
        this.count = Object.keys(res).length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
        this.errorMsg = error;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(value: any): void {
    const dialogRef = this.dialog.open(DetailsComponent, {
      autoFocus: false,
      minWidth: 350,
      enterAnimationDuration: '600ms',
      exitAnimationDuration: '800ms',
      data: {
        ID: value
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

}
