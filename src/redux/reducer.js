import { combineReducers } from "redux"

import filtersReducer from "../components/Filters/filtersSlice"
import todoListReducer from "../components/TodoList/todosSlice"

//cách 2: dùng combineReducers
const rootReducer = combineReducers({
    filters: filtersReducer,
    todoList: todoListReducer
})

//cach 1: không dùng combineReducers 
// const rootReducer = (state = {}, action) => {
//     return {
//         filters: filtersReducer(state.filters, action),
//         todoList: todoListReducer(state.todoList, action)
//     }
// }

export default rootReducer