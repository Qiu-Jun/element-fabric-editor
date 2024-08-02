import type { ModalProps } from 'element-plus'

// 普通模态框
export interface HookModalProps extends Partial<ModalProps> {
  /** 当前模态框是否处于App.vue上下文中 */
  isAppChild?: boolean
  content?: string | JSX.Element | (() => JSX.Element)
  closeModal?: () => void
}
