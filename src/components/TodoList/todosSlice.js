// const initState = [
//     { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//     { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//     { id: 3, name: 'Learn Javascript', completed: false, priority: 'Low' }
// ]

// const todoListReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'todoList/addTodo':
//             return [
//                 ...state,
//                 action.payload
//             ]
//         case 'todoList/toggleTodoStatus':
//             return state.map(todo =>
//                 todo.id === action.payload
//                     ? { ...todo, completed: !todo.completed }
//                     : todo)
//         default:
//             return state
//     }
// }

// export default todoListReducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] }, // [] => {status: '', todos: [] }
    reducers: { //IMMER
        addTodo: (state, action) => {
            state.push(action.payload)
        }, // action creators
        toggleTodoStatus: (state, action) => {
            const currentTodo = state.find((todo) => todo.id === action.payload)
            currentTodo.completed = !currentTodo.completed
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                console.log({ action })
                state.todos = action.payload;
                state.status = 'idle'
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                let currentTodo = state.todos.find((todo) => todo.id === action.payload.id)
                // eslint-disable-next-line no-unused-vars
                currentTodo.completed = action.payload.completed
            })
    }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    return data.todos
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    const res = await fetch('api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
    })
    const data = await res.json()
    return data.todos
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
    const res = await fetch('api/updateTodo', {
        method: 'POST',
        body: JSON.stringify(updatedTodo)
    })

    const data = await res.json()
    return data.todos
})

export default todosSlice

// action (object) va action creators () => {return action}
// thunk action (function) vaf thunk action creators () => {return thunk action}

// export function addTodos(todo) { //thunk function ~ thunk action
//     return function addTodosThunk(dispatch, getState) {
//         console.log('[addTodoThunk', getState());
//         console.log({ todo })
//         //custom
//         todo.name = 'Tri test updated'
//         dispatch(todosSlice.actions.addTodo(todo))

//         console.log('[addTodosThunk affer]', getState())
//     }
// }