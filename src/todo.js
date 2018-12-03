import uuidv4 from 'uuid/v4'
import { renderTodo } from './views'



// Read existing todos from localStrorage
const loadData = () => {
    const todosJSON = localStorage.getItem('todos')
    try { 
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

const todosData = loadData()
// 샘은 let todosData = [] 이걸로 시작해서
// const getTodo = () => todosData  이렇게 값을 내뱉는 '기능'을 만들어 수출함
// 나는 내뱉어진 '값'을 수출함


// Remove Todo
const removeTodo = (todoID) => {
    const todoIndex = todosData.findIndex((todo) => todo.id === todoID)
    todosData.splice(todoIndex, 1)
    saveTodos()
}

// Update check(completed true vs false) status
const toggleTodo = (id) => {
    const todoToCheck = todosData.find((todo) => todo.id === id)
    if(todoToCheck !== undefined) {
        todoToCheck.completed = !todoToCheck.completed
    }
    saveTodos()
}



// Create new todo and render
const createTodo = (e) => {
    e.preventDefault()
    const text = e.target.elements.todoContent.value.trim()
    if (text.length > 0) {
        const newTodo = {
            id: uuidv4(),
            text,
            completed: false
        }
        todosData.push(newTodo)
        e.target.elements.todoContent.value = ''

        saveTodos()
        renderTodo()  
    }
}


// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todosData))
}

export { todosData, removeTodo, toggleTodo, createTodo, saveTodos}