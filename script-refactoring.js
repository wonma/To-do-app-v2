// ------------------ Note -----------------------
// WHEN : 9th Nov. 2018
// 
// WHAT  - Refactoring
//-------------------------------------------------

const todos = getData()

// Keyword updator (Receiving a value from [Listener][02])
const filterInfo = {
    searchWord : '',
    hideCompleted : false
}

renderTodo(todos, filterInfo)

searchInput.addEventListener('input', function (e) {
    filterInfo.searchWord = e.target.value
    renderTodo(todos, filterInfo)
})

form.addEventListener('submit', createTodoObj)

checkbox.addEventListener('change', function (e) {
    filterInfo.hideCompleted = e.target.checked
    renderTodo(todos, filterInfo)
})
