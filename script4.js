// ------------------ Note -----------------------
// WHEN : 8th Nov. 2018
// 
// WHAT  - Try teacher's solution
//         
// NEXT : radio button
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



// Keyword updator (Receiving a value from [Listener][02])
const filterInfo = {
    searchWord : '',
    hideCompleted : false
}

// [Define Fn] Create p
const renderTodo = function (todoName, filterInfo) {


//***************** Solution 1 ****************************
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
//**********************************************************

// ***************** Solution 2 ****************************
    // let filteredTodo = todoName.filter(function (todo) {
    //     return todo.text.toLowerCase().includes(filterInfo.searchWord)
    // })

    // filteredTodo = filteredTodo.filter(function (todo) {
    //     if (filterInfo.hideCompleted) {
    //         return !todo.completed // completed가 false인것만 출력
    //     } else {
    //         return true // 그냥 키워드필터만 반영된것 출력
    //     }
    // })
// **********************************************************

// ***************** Solution 3 ****************************
    // let filteredTodo = todoName.filter(function (todo) {
    //     return todo.text.toLowerCase().includes(filterInfo.searchWord)
    // })

    // filteredTodo = filteredTodo.filter(function (todo) {
    //     if (filterInfo.hideCompleted) {
    //         return !todo.completed // completed가 false인것만 출력
    //     } else {
    //         return true // 그냥 키워드필터만 반영된것 출력
    //     }
    // })
// **********************************************************

    const incompleteTodoCount = filteredTodo.filter(function (todo) {
        return !todo.completed
    })

    todosArea.innerHTML = ''
    filteredTodo.forEach(function (each) {
        const newTodo = document.createElement('p')
        newTodo.textContent = each.text
        todosArea.appendChild(newTodo)
    })

    summaryArea.innerHTML = ''
    // [Create & Show] h2 with num of incomplete elements, put it on screen.
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodoCount.length} items to complete`
    summaryArea.append(summary)

}


// [Invoke Fn] Filter array + create p
renderTodo(todos, filterInfo)


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

    renderTodo(todos, filterInfo)
}


// [Listener][02] Input box
searchInput.addEventListener('input', function (e) {
    filterInfo.searchWord = e.target.value
    renderTodo(todos, filterInfo)
})

form.addEventListener('submit', createTodoObj)

checkbox.addEventListener('change', function (e) {
    filterInfo.hideCompleted = e.target.checked
    renderTodo(todos, filterInfo) // clean slate + database에 있는거 다 노출!
})
