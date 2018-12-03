// Keyword updator (Receiving a value from [Listener][02])
const filterInfo = {
    searchWord: '',
    hideCompleted: false
}

const getFilter = () => filterInfo


// setFilter부분을 잘 모르겠음..!
const setFilter = (newInputObj) => {
    if (typeof newInputObj.searchWord === 'string') {
        filterInfo.searchWord = newInputObj.searchWord
    }
    if (typeof newInputObj.hideCompleted === 'boolean')
        filterInfo.hideCompleted = newInputObj.hideCompleted
}

export { getFilter, setFilter}