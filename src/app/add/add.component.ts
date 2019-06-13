import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'app/todo.service';
// import { data } from 'app/data';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newTieude = '';
  newParent = '';
  menuchinh = '';
  trangthai = '';
  arrContent: any = [];
  constructor(private router: Router,private todoService: TodoService) {

  }

  ngOnInit() {
  
  }

  add() {
    this.todoService.add({
      tieude: this.newTieude,
      parent: this.newParent,
      menuchinh: this.menuchinh,
      trangthai: this.trangthai
    }).subscribe(()=>{
      this.router.navigate(['/contacts']);
    })
    // this.arrContent.push({
    //   id: this.arrContent.length+1,
    //   tieude: this.newTieude,
    //   parent: this.newParent,
    //   menuchinh: 'on',
    //   trangthai: 'on'
    // })
    // this.router.navigate(['/contacts']);
  }

  cancel(){
    this.router.navigate(['/contacts']);
  }
}
