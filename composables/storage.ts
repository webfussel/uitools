export const useStorage = () => {
  return {
    set(key : string, value : any) {
      localStorage.setItem(key, value)
    },
    get(key: string) {
      return JSON.parse(localStorage.getItem(key) || '{}')
    }
  }
}
