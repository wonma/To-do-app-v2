// ------------------ Note -----------------------
// WHEN : 8th Nov. 2018
// 
// WHAT  - add 'form' and use 'submit' event
//       
//
// NEXT : Use checkbox and radio
//-------------------------------------------------

const todos = [
    {
    text: 'walk a dog',
    completed: false
}, {
    text: 'learn JS',
    completed: true
}, {
    text: 'buy food',
    completed: false
}, {
    text: 'cook dinner',
    completed: true
}, {
    text: 'Be grateful',
    completed: true
}
]

const body = document.querySelector('body')
const searchInput = document.querySelector('#search-input')
const todosArea = document.querySelector('#todos-area')
const summaryArea = document.querySelector('#summary')
const form = document.querySelector('#form')


// [Define Fn] Count some array's incomplete items
const countIncomplete = function (todoName) {
    summaryArea.innerHTML = ''

    // [Array] Keep incomplete elements 
    const todoNotCompleted = todoName.filter(function (todo) {
        return todo.completed === false
    })

    // [Create & Show] h2 with num of incomplete elements, put it on screen.
    const summary = document.createElement('h2')
    summary.textContent = `You have ${todoNotCompleted.length} items to complete`
    summaryArea.append(summary)
}


// Keyword updator (Receiving a value from [Listener][02])
const filterKeyword = {
    searchWord : ''
}

// [Define Fn] Create p
const renderTodo = function (arrayName) {
    todosArea.innerHTML = ''

    arrayName.forEach(function (each) {
        const newTodo = document.createElement('p')
        newTodo.textContent = each.text
        todosArea.appendChild(newTodo)
    })
}

// [Define Fn] Filter array + 
const renderFilter = function (todoName) {    // Andrew made filterKeyword as 2nd arg.
    const filteredTodo = todoName.filter(function (todo) {
        return todo.text.toLowerCase().includes(filterKeyword.searchWord)
    })

    renderTodo(filteredTodo)
    countIncomplete(filteredTodo)
}

// [Invoke Fn] Filter array + create p
renderFilter(todos)


// [Listener][01] Add todo Button
// createBtn.addEventListener('click', function (e) {
//     createNewTodo(todos)
//     countIncomplete(todos)
// })


// [Create]
const createTodoObj = function (e) {
    e.preventDefault()
    const newTodoValue = e.target.elements.todoContent 
    // ** This was [let newTodoValue = e.target.elements.todoContent.value]
    const createdTodo = {
        text: newTodoValue.value, //** This was [text: newTodoValue]
        completed: false
    }
    todos.push(createdTodo)
    newTodoValue.value = ''
    // ** This was [newTodoValue = '']
    renderTodo(todos) // ** I created separate 2 renderTodo functions.
}


// [Listener][02] Input box
searchInput.addEventListener('input', function (e) {
    filterKeyword.searchWord = e.target.value
    renderFilter(todos)
})

form.addEventListener('submit', createTodoObj)