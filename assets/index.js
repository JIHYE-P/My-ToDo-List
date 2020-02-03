import './index.scss'

// 두 개의 보드로 작업관리 목록을 작성하십시오. 보류 중, 완료됨.
// 사용자가 보드를 전환할 수 있도록 허용하십시오.
// 사용자가 작업관리 항목을 삭제하도록 허용하십시오.
// localStorage에 모든 것을 저장하고 새로 고침 시 모든 것을 복원하십시오.
const todoForm = document.querySelector('.todoForm')
const todoInput = todoForm.querySelector('input')

const pendingList = document.querySelector('.pending-list')
const finishedList = document.querySelector('.finished-list')

const PENDING = 'pending'
const FINISHED = 'finished'

let pendingArr
let finishedArr

const element = (tagName, attrs = {}, childrens = []) => {
  const el = document.createElement(tagName)
  for(const attr in attrs) {
    el.setAttribute(attr, attrs[attr])
  }
  for(const child of childrens) {
    el.appendChild(child)
  }
  return el
}

const getTodo = text => {
  return {
    id: String(Date.now()),
    text
  }
}

const setStorage = () => {
  localStorage.setItem(PENDING, JSON.stringify(pendingArr))
  localStorage.setItem(FINISHED, JSON.stringify(finishedArr))
}

const pushPending = (todos) => {
  pendingArr.push(todos)
  return pendingArr
}

const pushFinished = (todos) => {
  finishedArr.push(todos)
  return finishedArr
}

const printFormat = (todos) => {
  const li = element('li')
  const span = element('span')
  const delBtn = element('button', {'class': 'delBtn'})

  li.id = todos.id
  span.innerText = todos.text
  delBtn.innerText = '❌'
  delBtn.addEventListener('click', handleDelete)

  li.appendChild(span)
  li.appendChild(delBtn)
  return li
}

const printPending = (todos) => {
  const format = printFormat(todos)
  const doneBtn = element('button', {'class': 'doneBtn'})

  doneBtn.innerText = '✅'
  doneBtn.addEventListener('click', handleDone)

  format.appendChild(doneBtn)
  pendingList.append(format)
}

const printFinished = (todos) => {
  const format = printFormat(todos)
  const replyBtn = element('button', {'class': 'replyBtn'})

  replyBtn.innerText = '⛔'
  replyBtn.addEventListener('click', handleReply)

  format.appendChild(replyBtn)
  finishedList.append(format)
}

const filterPending = (target) => {
  return pendingArr = pendingArr.filter(todo => todo.id !== target)
}
const filterFinished = (target) => {
  return finishedArr = finishedArr.filter(todo => todo.id !== target)
}
const findPending = (target) => {
  return pendingArr.find(todo => todo.id === target)
}
const findFinished = (target) => {
  return finishedArr.find(todo => todo.id === target)
}

const handleSubmit = (e) => {
  e.preventDefault()
  const text = todoInput.value
  const todo = getTodo(text)
  todoInput.value = ''
  pushPending(todo)
  printPending(todo)
  setStorage()
}

const handleDone = (e) => {
  e.preventDefault()
  const li = e.target.parentNode
  li.parentNode.removeChild(li)

  const doneTodo = findPending(li.id)
  filterPending(li.id)
  pushFinished(doneTodo)
  printFinished(doneTodo)
  setStorage()
}

const handleDelete = (e) => {
  e.preventDefault()
  const li = e.target.parentNode
  li.parentNode.removeChild(li)
  filterPending(li.id)
  filterFinished(li.id)
  setStorage()
}

const handleReply = (e) => {
  e.preventDefault()
  const li = e.target.parentNode
  li.parentNode.removeChild(li)

  const replyTodo = findFinished(li.id)
  filterFinished(li.id)
  pushPending(replyTodo)
  printPending(replyTodo)
  setStorage()
}

const initLoad = () => {
  pendingArr = JSON.parse(localStorage.getItem(PENDING)) || []
  finishedArr = JSON.parse(localStorage.getItem(FINISHED)) || []
}

const prindLoad = () => {
  pendingArr.forEach(todos => printPending(todos))
  finishedArr.forEach(todos => printFinished(todos))
}

function init () {
  todoForm.addEventListener('submit', handleSubmit)
  initLoad()
  prindLoad()
}
init()