import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "../../todos/models/todo.model";
import { borrar, borrarCompletados, crear, editar, toggle, toggleAll } from "./todo.actions";

export const initialState: Todo[] = [];

const _todoReducer = createReducer(initialState,
    on(crear, (state, {texto}) => [...state, new Todo(texto)]),
    on(borrarCompletados, (state) => {
        return state.filter(todo => !todo.completado)
    }),
    on(toggle, (state, {id}) => {
        return state.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            }
            return todo;
        });
    }),
    on(editar, (state, {id,texto}) => {
        return state.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto,
                }
            }
            return todo;
        });
    }),
    on(borrar, (state, {id}) => state.filter((todo) => todo.id !== id)),
    on(toggleAll, (state, {completado}) => {
        return state.map((todo) => {
            return {
                ...todo,
                completado,
            }
        });
    }),
 );

export function todoReducer(state: Todo[] = initialState, action: Action) {
    return _todoReducer(state, action);
};