
function authReducer (state, action) {
  switch (action.type) {
      case 'LOGIN':
          return {isAuthenticated: true, userId: action.login.userId, userName: action.login.userName}
      case 'LOGOUT':
          return {isAuthenticated: false, userId:null, userName:null}
      default:
          return state
  }
}

function usersReducer (state, action) {
  switch (action.type) {
      case 'FETCH_USERS':
          return action.users
      default:
          return state
  }
}

function worksReducer (state, action) {
  switch (action.type) {
      case 'FETCH_WORKS':
        return action.works
      case 'CREATE_WORK':
          const newWork = { workId: action.workId, userName: action.userName, 
            contents: action.contents, price: action.price, workDate: action.workDate }
          return [ newWork, ...state ]
      case 'DELETE_WORK':
          return state.filter(x => x.workId !== action.workId)
      default:
          return state
  }
}

function memoReducer (state, action) {
  switch (action.type) {
      case 'FETCH_MEMO':
        return action.memo
      case 'CREATE_MEMO':
          const newMemo = { memoId: action.memoId, userId: action.userId, 
            contents: action.contents}
          return [ newMemo, ...state ]
      case 'DELETE_MEMO':
          return state.filter(x => x.memoId !== action.memoId)
      default:
          return state
  }
}

function dutiesReducer (state, action) {
  switch(action.type) {
    case 'FETCH_DUTIES':
      return action.duties
    case 'CREATE_DUTY':
      const newDuty = {dutyId: action.dutyId, userName: action.userName, contents: action.contents, price: action.price}
      return [...state, newDuty]
    case 'DELETE_DUTY':
      return state.filter(x => x.dutyId !== action.dutyId)
    default:
      return state
  }
}

function noticeReducer (state, action) {
  switch(action.type) {
    case 'DUTIES_ERROR':
      return { text: '家事の取得に失敗しました', level: 'error', open: true }
    case 'CREATE_SUCCESS':
      return { text: '登録に成功しました。', level: 'success', open: true }
    case 'DELETE_SUCCESS':
        return { text: '削除に成功しました。', level: 'success', open: true }
    case 'WORKS_ERROR':
      return { text: '履歴の取得に失敗しました', level: 'error', open: true }
    case 'USED_ERROR':
        return { text: '履歴の取得に失敗しました', level: 'error', open: true }
    case 'MEMO_ERROR':
        return { text: 'メモの取得に失敗しました', level: 'error', open: true }
    case 'USERS_ERROR':
        return { text: 'ユーザーの取得に失敗しました', level: 'error', open: true }
    case 'LOGIN_ERROR':
        return { text: 'ログインに失敗しました', level: 'error', open: true }
    case 'CLOSE_NOTICE':
      return { ...state, open: false }
    default:
      return state
  }
}

function usedReducer (state, action) {
  switch(action.type) {
    case 'FETCH_USED':
      return action.used
    case 'CREATE_USED':
      const newUsed = { usedId: action.usedId, userName: action.userName, 
        contents: action.contents, price: action.price, usedDate: action.usedDate }
      return [ newUsed, ...state ]
    case 'DELETE_USED':
      return state.filter(x => x.usedId !== action.usedId)
    default:
      return state
  }
}

export default function appReducer (state, action) {
  return {
      login: authReducer(state.login, action),
      users: usersReducer(state.users, action),
      works: worksReducer(state.works, action),
      memo: memoReducer(state.memo, action),
      duties: dutiesReducer(state.duties, action),
      notice: noticeReducer(state.notice, action),
      used: usedReducer(state.used, action)
  }
}
