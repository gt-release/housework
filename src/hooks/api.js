import { useResource } from 'react-request-hook'

export function useAPIGetDuty () {
    return useResource(() => ({
      url: '/duty/',
      method: 'get'
    }))
  }

  export function useAPIPostDuty () {
    return useResource(({userName, contents, price}) => ({
      url: '/duty/add',
      method: 'post',
      data: {userName, contents, price}
    }))
  }

  export function useAPIDeleteDuty () {
    return useResource((dutyId) => ({
      url: '/duty/delete',
      method: 'delete',
      data: dutyId
    }))
  }

  export function useAPIGetWork () {
    return useResource(() => ({
      url: '/work/',
      method: 'get'
    }))
  }

  export function useAPIPostWork () {
    return useResource(({userName, contents, price, workDate}) => ({
      url: '/work/add',
      method: 'post',
      data: {userName, contents, price, workDate}
    }))
  }

  export function useAPIDeleteWork () {
    return useResource((workId) => ({
      url: '/work/delete',
      method: 'delete',
      data: workId
    }))
  }

  export function useAPIAggregatePocket () {
    return useResource(({userName, selectedMonth}) => ({
      url: `/pocket/aggregate?userName=${userName}&selectedMonth=${selectedMonth}`,
      method: 'get'
    }))
  }

  export function useAPISumPocket () {
    return useResource(() => ({
      url: '/pocket/sum',
      method: 'get'
    }))
  }

  export function useAPIGetUsed () {
    return useResource(() => ({
      url: '/used',
      method: 'get'
    }))
  }

  export function useAPIPostUsed () {
    return useResource(({userName, contents, price, usedDate}) => ({
      url: '/used/add',
      method: 'post',
      data: {userName, contents, price, usedDate}
    }))
  }

  export function useAPIDeleteUsed () {
    return useResource((usedId) => ({
      url: '/used/delete',
      method: 'delete',
      data: usedId
    }))
  }

  export function useAPILogin() {
    return useResource((userName, password) => ({
      url: '/auth/login',
      method: 'post',
      data: {userName, password}
    }))
  }

  export function useAPIGetUsers () {
    return useResource(() => ({
      url: '/auth/users',
      method: 'get'
    }))
  }

  export function useAPIGetUserInfo () {
    return useResource(() => ({
      url: '/user',
      method: 'get'
    }))
  }

  export function useAPIPostMemo () {
    return useResource(({userId, contents}) => ({
      url: '/memo/add',
      method: 'post',
      data: {userId, contents}
    }))
  }

  export function useAPIGetMemo () {
    return useResource(() => ({
      url: '/memo/',
      method: 'get'
    }))
  }

  export function useAPIDeleteMemo () {
    return useResource((memoId) => ({
      url: '/memo/delete',
      method: 'delete',
      data: memoId
    }))
  }