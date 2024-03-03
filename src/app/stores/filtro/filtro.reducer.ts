import { Action, createReducer, on } from "@ngrx/store";
import { filtrosValidos, setFiltro } from "./filtro.actions";

export const filtroInicial: filtrosValidos = 'todos';

const _filtroReducer = createReducer<filtrosValidos, Action>(filtroInicial,
    on(setFiltro, (state: filtrosValidos, {filtro}) => filtro),
)

export function filtroReducer(state: filtrosValidos = filtroInicial, action: Action) {
    return _filtroReducer(state, action);
};