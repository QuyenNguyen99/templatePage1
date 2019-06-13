import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { data } from 'app/data';
import { TodoService } from 'app/todo.service';
import { httpFactory } from '@angular/http/src/http_module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  arrContent: any = [];
  objectEdit: any = {};
  id_category: number;
  tieude: String = '';
  parent: String = '';
  menuchinh: String = '';
  trangthai: String = '';
  constructor(private router: Router, private todoService: TodoService) { }
  ngOnInit() {
    const id_category = location.pathname.split("/")[3]; // Lấy ra id
    console.log(id_category)
    this.todoService.getOne(id_category).subscribe((edit) => {// lấy dữ liệu từ bên ngoài vòa bảng edit
      this.objectEdit = edit;
      this.id_category = this.objectEdit.id_category;
      this.tieude = this.objectEdit.title_category;
      this.parent = this.objectEdit.parent;
      this.menuchinh = this.objectEdit.main_menu;
      this.trangthai = this.objectEdit.status;
    })
  }

  edit() {
    // this.objectEdit.title = this.tieude;
    // console.log(this.objectEdit.title);
    // this.objectEdit.parent = this.parent;
    // this.objectEdit.main_menu = this.menuchinh;
    // this.objectEdit.status = this.trangthai;
    // this.arrContent = this.objectEdit;
    // console.log(this.arrContent);

    this.todoService.update(this.id_category,{ // convert data from client to serve
      title   : this.tieude,
      parent   : this.parent,
      menuchinh   : this.menuchinh,
      trangthai   : this.trangthai,
    }).subscribe(()=>{
      this.router.navigate(['/contacts']); // redirect to page contacts
    })
  }
  cancel(){
    this.router.navigate(['/contacts']);
  }
}