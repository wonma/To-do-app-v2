// ------------------ Note -----------------------
// WHEN : 8th Nov. 2018
// 
// WHAT  - use checkbox to make 'hide completed' function
//         (Success!!!) :D
// NEXT : Try teacher's solution
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
const checkbox = document.querySelector('#check-hide')


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


// [Create] A or B : if unchecked vs checked
const createTodoObj = function (e) {
    e.preventDefault()
    const newTodoValue = e.target.elements.todoContent
    const createdTodo = {
        text: newTodoValue.value,
        completed: false
    }
    todos.push(createdTodo)
    newTodoValue.value = ''

    if (checkbox.checked) {
        hideComplete(todos)      // show complete items
    } else {
        renderTodo(todos)   // show all items
    }
}

// [Create] Filter Complete
const hideComplete = function (todoName) {

    // [Array] Keep incomplete elements 
    const filterComplete = todoName.filter(function (todo) {
        return todo.completed === false
    })
    renderFilter(filterComplete)

}

// [Listener][02] Input box
searchInput.addEventListener('input', function (e) {
    filterKeyword.searchWord = e.target.value
    renderFilter(todos)
})

form.addEventListener('submit', createTodoObj)

checkbox.addEventListener('change', function (e) {
    if (e.target.checked) {
        hideComplete(todos)
    } else {
        renderTodo(todos)
    }
})