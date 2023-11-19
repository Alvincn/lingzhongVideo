export class LOCALSTORAGE {
  setItem(name,value) {
      window.localStorage.setItem(name,value)
  }
  getItem(name){
      return window.localStorage.getItem(name)
  }
  removeItem(name){
      window.localStorage.removeItem(name)
  }
  clearItem() {
      window.localStorage.clear()
  }
}

export class SESSIONSTORAGE {
  setItem(name,value) {
      window.sessionStorage.setItem(name,value)
  }
  getItem(name){
      return window.sessionStorage.getItem(name)
  }
  removeItem(name){
      window.sessionStorage.removeItem(name)
  }
  clearItem() {
      window.sessionStorage.clear()
  }
}
