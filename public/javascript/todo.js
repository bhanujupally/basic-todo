const byId = (id) => document.getElementById(id);
const selectors = {
    TODO_INPUT: "todoInput",
    ADD_BTN: "addBtn",
    LIST_TEMPLATE: "list-item-template",
    TODO_LIST: "todoList",
};

let todoList = [];

function startApp() {
    todoList = readLocalstore() || [];
    bindListeners();
    renderList();
}

function onAdd() {
    const inputEl = byId(selectors.TODO_INPUT);
    const value = inputEl.value;
    if (value) {
        todoList.push({value, done: false});
        inputEl.value = '';
        updateLocalstore(todoList);
        renderList();
    }
}
function onRemove(e) {
    const idx = e.target.closest('.list-item').dataset.itemIdx;
    todoList.splice(idx, 1);
    updateLocalstore(todoList);
    renderList();
}
function onCheck(e) {
    const idx = e.target.closest('.list-item').dataset.itemIdx;
    todoList[idx].done = !!e.target.checked;
    updateLocalstore(todoList);
    renderList();
}

function renderList() {
    const listEl = byId(selectors.TODO_LIST);
    listEl.innerHTML = '';
    todoList.forEach((item, idx) => {
        const listItem = byId(selectors.LIST_TEMPLATE).content.cloneNode(true);
        listItem.querySelector('.list-title').innerHTML = item.value;
        listItem.querySelector('.done-check').checked = !!item.done;
        listItem.querySelector('.list-item').dataset.itemIdx = idx;
        listEl.appendChild(listItem);
    })
}

function readLocalstore() {
    return JSON.parse(window.localStorage.getItem('todoList'));
}

function updateLocalstore(todoList) {
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
}

function bindListeners() {
    byId(selectors.ADD_BTN).addEventListener('click', onAdd);
    byId(selectors.TODO_LIST).addEventListener('click', e => {
        if (e.target.classList.contains('list-delete')) {
            onRemove(e);
        } else if (e.target.classList.contains('done-check')) {
            onCheck(e);
        }
    });
}

export { startApp };

