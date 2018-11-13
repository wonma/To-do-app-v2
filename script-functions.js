
const body = document.querySelector('body')
const searchInput = document.querySelector('#search-input')
const todosArea = document.querySelector('#todos-area')
const summaryArea = document.querySelector('#summary')
const form = document.querySelector('#form')
const checkbox = document.querySelector('#check-hide')
 

// Read existing todos from localStrorage
const getData = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)  // parsed array
    } else {
        return []  // empty array
    }
}


// Remove Todo
const removeTodo = function (todoID) {
    const todoIndex = todos.findIndex(function (todo) {
        todo.id === todoID
    })
    todos.splice(todoIndex, 1)
}

// Update check(completed true vs false) status
const updateCheckStatus = function (id) {
    // const checkTodoId = todos.findIndex(function (todo) {
    //     return todo.id === id
    // }) 
    // if(!todos[checkTodoId].completed){
    //     todos[checkTodoId].completed = true
    // } else {
    //     todos[checkTodoId].completed = false
    // }
    //
    //샘 버젼
    const todoToCheck = todos.find(function (todo) {
        return todo.id === id
    })
    if(todoToCheck !== undefined) {
        todoToCheck.completed = !todoToCheck.completed
    }
}

// Get the DOM elements for individual notes
const generateTodoDOM = function (filteredTodo) {
    todosArea.innerHTML = ''
    filteredTodo.forEach(function (eachTodo) {
        const todoDiv = document.createElement('div')
        const checkboxLabel = document.createElement('label')
        const checkboxEl = document.createElement('input')
        const textEl = document.createElement('span')
        const removeButton = document.createElement('button')

        // Setup checbox in label
        checkboxEl.setAttribute('type', 'checkbox')
        // if (eachTodo.completed === true) {
        //     checkboxEl.setAttribute('checked', true)
        // } 내가한것은 복잡함
        checkboxEl.checked = eachTodo.completed // 이건 샘이 간단하게 한 것
        checkboxLabel.appendChild(checkboxEl)
        checkboxEl.addEventListener('change', function () {
            updateCheckStatus(eachTodo.id)
            saveTodos(todos)
            renderTodo(todos, filterInfo)
        })

        // Setup text in label
        textEl.textContent = eachTodo.text
        checkboxLabel.appendChild(textEl)

        // Setup checkbox label
        todoDiv.appendChild(checkboxLabel)

        // Setup delete button
        removeButton.textContent = 'x'
        todoDiv.appendChild(removeButton)
        removeButton.addEventListener('click', function () {
            removeTodo(eachTodo.id) // modifying
            saveTodos(todos) // saving in localStorage
            renderTodo(todos, filterInfo) // rerendering
        })

        // Generate a single todo
        todosArea.appendChild(todoDiv)
    })
}


// Get the DOM element for list summary 
const generateSummaryDOM = function (filteredTodo) {
    const incompleteTodoCount = filteredTodo.filter(function (todo) {
        return !todo.completed
    })

    summaryArea.innerHTML = ''
    // [Create & Show] h2 with num of incomplete elements, put it on screen.
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodoCount.length} items to complete`
    summaryArea.append(summary)
}


//  Render app todos based on filters
const renderTodo = function (todoName, filterInfo) {

    let filteredTodo = todoName.filter(function (todo) {
        return todo.text.toLowerCase().includes(filterInfo.searchWord)
      
    })

    filteredTodo = filteredTodo.filter(function (todo) {
        if (filterInfo.hideCompleted) {
            return !todo.completed // completed가 false인것만 출력
        } else {
            return true // 그냥 키워드필터만 반영된것 출력
        }
    })

    generateTodoDOM(filteredTodo)
    generateSummaryDOM(filteredTodo)
}

// Create new todo and render
const createTodoObj = function (e) {
    e.preventDefault()

    const createdTodo = {
        id: uuidv4(),
        text: e.target.elements.todoContent.value,
        completed: false
    }
    todos.push(createdTodo)  
    e.target.elements.todoContent.value = ''

    saveTodos(todos)
    renderTodo(todos, filterInfo)  
}


// Save todos to localStorage
const saveTodos = function (todos) {
    todosToJSON = JSON.stringify(todos) 
    localStorage.setItem('todos', todosToJSON)
}

