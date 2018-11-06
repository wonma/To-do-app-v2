const todos = [{
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
}]


const body = document.querySelector('body') // node로 실행하면 당연히 안잡힘.
const button = document.querySelector('button')

const todoNotCompleted = todos.filter(function(todo) {
    return todo.completed === false
})
const summary = document.createElement('h2')
summary.textContent = `You have ${todoNotCompleted.length} items to complete`
body.append(summary)

// The code below only shows the incomplete items.
//
// for (let i = 0; i < todoNotCompleted.length; i++) {
//     const newParagraph = document.createElement('p')
//     newParagraph.textContent = `${todoNotCompleted[i].text}`
//     body.append(newParagraph)
// }


todos.forEach(function (todo) {
    const newItem = document.createElement('p')   // 샘은 const p 라고 이름지음
    newItem.textContent = todo.text
    body.append(newItem)
})

button.addEventListener('click', function (e) {
    e.target.textContent = 'hahaha'
})
