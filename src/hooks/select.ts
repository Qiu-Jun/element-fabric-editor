import Editor, { EventType } from '@/lib/core'
import { useI18n } from 'vue-i18n'

const { SelectMode } = EventType

interface Selector {
  mSelectMode: (typeof SelectMode)[keyof typeof SelectMode]
  mSelectOneType: string | undefined
  mSelectId: string | undefined
  mSelectIds: (string | undefined)[]
  mSelectActive: unknown[]
}

export default function useSelect() {
  const fabric = inject('fabric')
  const { t } = useI18n()
  const canvasEditor = inject('canvasEditor') as Editor
  const mixinState = inject('mixinState') as Selector

  return {
    fabric,
    canvasEditor,
    mixinState,
    t
  }
}
