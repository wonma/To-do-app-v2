import { createTodo } from './todo'
import { renderTodo } from './views'
import { setFilter } from './filters'

const searchInput = document.querySelector('#search-input')
const form = document.querySelector('#form')
const checkbox = document.querySelector('#check-hide')

renderTodo()

searchInput.addEventListener('input', (e) => {
    setFilter({
        searchWord: e.target.value
    })
    renderTodo()
})

form.addEventListener('submit', createTodo)

checkbox.addEventListener('change', (e) => {
    setFilter({
        hideCompleted: e.target.checked
    })
    renderTodo() // 검색어 필터, hide상태일치인것 필터 거친 array 출력
})
