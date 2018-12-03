// ------------------ Note -----------------------
// WHEN : 7th Nov. 2018
// 
// WHAT  - To-do live searchc
//       - Count incomplete items
//       - Receive user input value (not by submit)
//
// NEXT : Add a feature to receive input through 'submit' (script.js)
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
const createBtn = document.querySelector('#create-to-do')
const newInput = document.querySelector('#new-input')
const searchInput = document.querySelector('#search-input')
const todosArea = document.querySelector('#todos-area')
const summaryArea = document.querySelector('#summary')


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

// [Define Fn] Filter array + create p
const renderFilter = function (todoName) {    // Andrew made filterKeyword as 2nd arg.
    const filteredTodo = todoName.filter(function (todo) {
        return todo.text.toLowerCase().includes(filterKeyword.searchWord)
    })

    todosArea.innerHTML = ''

    // [Create & Show - from Array]
    filteredTodo.forEach(function (each) {
        const newTodo = document.createElement('p')
        newTodo.textContent = each.text
        todosArea.appendChild(newTodo)
    })

    countIncomplete(filteredTodo)
}


// [Define Fn] Create a single new todo
const createNewTodo = function () {
    const createdTodo = {
        text: newInput.value,
        completed: false
    }
    todos.push(createdTodo)

    newInput.value = ''
    todosArea.innerHTML = ''

    todos.forEach(function (each) {
        const updatedTodo = document.createElement('p')
        updatedTodo.textContent = each.text
        todosArea.appendChild(updatedTodo)
    })
}


// [Invoke Fn] Filter array + create p
renderFilter(todos)


// [Listener][01] Add todo Button
createBtn.addEventListener('click', function (e) {
    createNewTodo(todos)
    countIncomplete(todos)
})


// [Listener][02] Input box
searchInput.addEventListener('input', function (e) {
    filterKeyword.searchWord = e.target.value
    renderFilter(todos)
})