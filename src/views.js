import { todosData, removeTodo, toggleTodo } from './todo'
import { getFilter } from './filters'


// Get the DOM elements for individual notes
const generateTodoDOM = (eachTodo) => {
    const labelEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')

    // Set up checbox in container
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = eachTodo.completed
    containerEl.appendChild(checkboxEl)
    checkboxEl.addEventListener('change', () => {
        toggleTodo(eachTodo.id) // checkbox for each 
        renderTodo()
    })

    // Set up text in container
    textEl.textContent = eachTodo.text
    containerEl.appendChild(textEl)

    // Set up container in label
    labelEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    labelEl.appendChild(containerEl)

    // Set up remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    labelEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(eachTodo.id) // modifying
        renderTodo() // rerendering
    })
    return labelEl
}


// Get the DOM element for list summary 
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompleteTodos.length} item${plural} to complete`
    summary.classList.add('list-title')
    return summary
}


//  Render app todos based on filters
const renderTodo = () => {
    const filterInfo = getFilter()
    let filteredTodo = todosData.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filterInfo.searchWord)
        const hideCompleteMatch = !filterInfo.hideCompleted || !todo.completed 
                                    //false                     // false (안숨기기 + 완료안된 아템)
                                    //false                     // true  (안숨기기 + 완료된 아템)
                                    //true                      // false (숨기기일때 + 미완인 아템)
                                    //즉 true true인 상황(완료는숨기기인데 + 해당아템이 완료인거) 인거 빼곤 다 나와랏
        return searchTextMatch && hideCompleteMatch
                                    //원래는 조건문 2개포함하는게 아니라, 필터된걸 가지고 다시 필터링했었음 
    })
    const incompleteTodos = filteredTodo.filter((todo) => !todo.completed)

    const todosArea = document.querySelector('#todos-area')
    todosArea.innerHTML = ''

    // Render Summary
    todosArea.appendChild(generateSummaryDOM(incompleteTodos))

    // Render To-do List
    if (filteredTodo.length > 0) {
        filteredTodo.forEach((todo) => {
            todosArea.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No To-do Yet'
        messageEl.classList.add('empty-message')
        todosArea.appendChild(messageEl)
    }

    // Think about how to populate 'div(todosArea)'
}



export { generateTodoDOM, generateSummaryDOM, renderTodo }