'use strict'

const todos = getData()

// Keyword updator (Receiving a value from [Listener][02])
const filterInfo = {
    searchWord : '',
    hideCompleted : false
}

renderTodo(todos, filterInfo)

searchInput.addEventListener('input', (e) => {
    filterInfo.searchWord = e.target.value
    renderTodo(todos, filterInfo)
})

form.addEventListener('submit', createTodoObj)

checkbox.addEventListener('change', (e) => {
    filterInfo.hideCompleted = e.target.checked
    renderTodo(todos, filterInfo)
})
