import { createServer, Model } from "miragejs";

export const setupServer = () => {
    createServer({
        models: {
            todos: Model,
            filters: Model
        },
        routes() {
            this.get("/api/todos", (schema) => {
                return schema.todos.all()
            })
            this.post("api/todos", (schema, request) => {
                const payload = JSON.parse(request.requestBody)

                return schema.todos.create(payload)
            })
            this.post('api/updateTodo', (schema, request) => {
                const id = JSON.parse(request.requestBody)

                const currentTodo = schema.todos.find(id)

                currentTodo.update({ completed: !currentTodo.completed })
                console.log({ currentTodo });

                return currentTodo
            })

            // create api filtersSearch
            this.post("/api/filtersSearch", (schema, request) => {
                let search = JSON.parse(request.requestBody)
                return schema.filters.create({ search })
            })
            this.post("/api/filtersStatus", (schema, request) => {
                let status = JSON.parse(request.requestBody)
                console.log({ status });
                return schema.filters.create({ status })
            })
            this.post("/api/filtersPriority", (schema, request) => {
                let priorities = JSON.parse(request.requestBody)
                console.log({ priorities });
                return schema.filters.create({ priorities })
            })
        }
    })
}