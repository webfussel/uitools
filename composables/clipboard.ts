export const useClipbord = () => {
  return {
    copy: (text: string, successCb ?: Function, errorCb ?: Function) => {
      if (!navigator.clipboard || !window.isSecureContext) {
        errorCb?.()
        return
      }

      navigator.permissions.query({ name: 'clipboard-write' as any}).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(text).then(() => {
            successCb?.()
          }, () => {
            errorCb?.()
          })
        }
      })
    }
  }
}
