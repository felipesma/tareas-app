import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../stores/app.state';
import * as actions from '../../stores/todos/todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit{

  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  checkCompletado!: FormControl;
  txtInput!: FormControl;

  editar:boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.checkCompletado.valueChanges.subscribe(valor => {
      console.log(valor);
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editando() {
    this.txtInput.setValue(this.todo.texto)
    this.editar = true;
    setTimeout(() => this.txtInputFisico.nativeElement.select(), 1)
  }

  borrar() {
    this.store.dispatch(actions.borrar({id: this.todo.id}))
  }

  salirDeFoco() {
    this.editar = false;
    if (this.txtInput.invalid) return;
    this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}))
  }
}
