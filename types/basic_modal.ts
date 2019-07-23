export interface BasicModalState {
  isShow: boolean
  isLoading: boolean
  title: string
  body: string
  isDecideBtnActive: boolean
  handleOnClickDecide: Function
  isOnlyConfirm: boolean
  isFreezed: boolean
  closeHook: Function
}
