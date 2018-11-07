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


const body = document.querySelector('body') // node로 실행하면 당연히 안잡힘.
const createBtn = document.querySelector('#create-to-do')
const newInput = document.querySelector('#new-input')
const searchInput = document.querySelector('#search-input')
const todosArea = document.querySelector('#todos-area')
const summaryArea = document.querySelector('#summary')
// ? 서치된 Array로만 incomplete리스트 구성해야할까?
// ? 아니면, 서치되더라도, 전체아이템의 incomplete 구성해야할까?  ->이걸로해보겠음.

// Keyword updator
const filterKeyword = {
    searchWord : ''
}

// Filter array + create p
const renderFilter = function (todoName) {
    let filteredTodo = todoName.filter(function (todo) {
        return todo.text.toLowerCase().includes(filterKeyword.searchWord)
    })

    todosArea.innerHTML = ''

    filteredTodo.forEach(function (each) {
        const newTodo = document.createElement('p')
        newTodo.textContent = each.text
        todosArea.appendChild(newTodo)
    })
}

renderFilter(todos)

// [Array] Keep incomplete elements 
const countIncomplete = function (todoName) {
    const todoNotCompleted = todoName.filter(function (todo) {
        return todo.completed === false
    })

    const summary = document.createElement('h2')
    summary.textContent = `You have ${todoNotCompleted.length} items to complete`
    summaryArea.append(summary)
}

countIncomplete(todos)

// Create h2 containing the number of incomplete elements and put it in body.



// Put new p containing title of todos' elements in body
// todos.forEach(function (todo) {
//     const newItem = document.createElement('p')   // 샘은 const p 라고 이름지음
//     newItem.textContent = todo.text
//     body.append(newItem)
// })

// [Listener] Add todo Button
createBtn.addEventListener('click', function (e) {
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
    summaryArea.innerHTML = ''
    countIncomplete(todos)
})

// [Listener] Input box
searchInput.addEventListener('input', function (e) {
    filterKeyword.searchWord = e.target.value
    renderFilter(todos)
})