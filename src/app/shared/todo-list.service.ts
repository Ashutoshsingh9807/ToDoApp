import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  todoList: AngularFireList<any>;

  constructor( private db:AngularFireDatabase) { }
  getToDoList() {
    this.todoList = this.db.list('titles');
    return this.todoList;
  }
  addTitle(title:string) {
    this.todoList.push({
      title:title,
      isChecked:false
    });
  }
  checkOrUncheckTitle($key:string, flag:boolean) {
    this.todoList.update($key, {isChecked:flag});
  }
  removeTitle($key:string) {
    this.todoList.remove($key);
  }
}
