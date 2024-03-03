import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../stores/app.state';
import * as actions from '../../stores/filtro/filtro.actions';
import { borrarCompletados } from '../../stores/todos/todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent implements OnInit{

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;
  
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(
      (state) => {
        this.filtroActual = state.filtro;
        this.pendientes = state.todos.filter(todo => !todo.completado).length;
      }
    )
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    this.store.dispatch(actions.setFiltro({filtro}));
  }

  borrarCompletados() {
    this.store.dispatch(borrarCompletados())
  }

}
