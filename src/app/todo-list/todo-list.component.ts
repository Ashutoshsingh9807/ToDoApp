import { Component, OnInit } from '@angular/core';

import {TodoListService} from '../shared/todo-list.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers : [TodoListService]
})
export class TodoListComponent implements OnInit {
  toDoListArray:any[];

  constructor( private todo:TodoListService) { }

  ngOnInit() {
    this.todo.getToDoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
      //sorting the array if any value is checked
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
    
  }
  onAdd(itemTitle) {
    if(itemTitle.value == 0 ) {
      alert('Please enter some value');
    }
    else {
      this.todo.addTitle(itemTitle.value);
      alert(itemTitle.value + " List added successfully")
      itemTitle.value = null;
    }
  }
  alterCheck($key:string,isChecked) {
    this.todo.checkOrUncheckTitle($key,!isChecked);
    if(isChecked === false) {
      alert('Marked as Completed');
    }
    else {
      alert('Marked as Incompleted');
    }
  }
  onDelete($key :string) {
    if (confirm('Are you sure want to delete')) {
    this.todo.removeTitle($key);
      alert('Deleted successfully');
    }
  }
  /*toggle function */
  showToggle:boolean = false;
  showToggleFun() {
    if(this.showToggle == true) {
      this.showToggle = false;
    }
    else {
      this.showToggle = true;
    }
  }
}
