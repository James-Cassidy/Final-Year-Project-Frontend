const load = (id: string) => {
  return sessionStorage.getItem(id)
}

const store = (id: string, data: any) => {
  return sessionStorage.setItem(id, data)
}

const remove = (id: string) => {
  return sessionStorage.removeItem(id)
}

export { load, store, remove }
