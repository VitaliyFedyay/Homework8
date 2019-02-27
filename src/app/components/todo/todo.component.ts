import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos = [];
  dones = [];
  msg = '';

  ngOnInit() {
    this.setTodos();
  }

  addTodo(todo) {
    if (todo.value !== '') {
      this.todos.push(todo.value);
      todo.value = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.setTodos();
      this.msg = '';
    } else {
      this.msg = 'This field cannot be left blank';
    }
  }

  // local storage
  setTodos() {
    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    } else {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    }

    if (!localStorage.getItem('dones')) {
      localStorage.setItem('dones', JSON.stringify(this.dones));
    } else {
      this.dones = JSON.parse(localStorage.getItem('dones'));
    }

  }

  removeTodo(todo) {
    const index = this.todos.indexOf(todo.innerHTML);
    this.deleteArrayItem(this.todos, index);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.msg = '';
  }

  markAsDone(todo) {
    const index = this.todos.indexOf(todo.innerHTML);
    this.dones.push(todo.innerHTML);
    this.deleteArrayItem(this.todos, index);

    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('dones', JSON.stringify(this.dones));
    this.msg = '';
  }

  removeDone(done) {
    const index = this.dones.indexOf(done.innerHTML);
    this.deleteArrayItem(this.dones, index);
    localStorage.setItem('dones', JSON.stringify(this.dones));
    this.msg = '';
  }

  deleteArrayItem(arr, index) {
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
}
