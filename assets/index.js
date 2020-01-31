import './index.scss'

// 두 개의 보드로 작업관리 목록을 작성하십시오. 보류 중, 완료됨.
// 사용자가 보드를 전환할 수 있도록 허용하십시오.
// 사용자가 작업관리 항목을 삭제하도록 허용하십시오.
// localStorage에 모든 것을 저장하고 새로 고침 시 모든 것을 복원하십시오.
const todoForm = document.querySelector('.todoForm')
const todoInput = todoForm.querySelector('input')

const PENDING = 'pending'
const FINISHED = 'finished'

let pendingArr
let finishedArr

const getTodo = text => {
  return {
    id: String(Date.now()),
    text
  }
}

const todoMake = () => {
  localStorage.setItem(PENDING, JSON.stringify(pendingArr))
}

const handleSubmit = (e) => {
  e.preventDefault()
  const text = todoInput.value
  const todo = getTodo(text)
  todoInput.value = ''
}

const initLoad = () => {
  pendingArr = JSON.parse(localStorage.getItem(PENDING)) || []
  finishedArr = JSON.parse(localStorage.getItem(FINISHED)) || []
}

const init = () => {
  todoForm.addEventListener('submit', handleSubmit)
  initLoad()
}
init()