export interface Template {
  id: string
  name?: string
  version: string
  workSpace: WorkSpaceElement
  background?: string
  backgroundImage?: SerializedImageProps
  zoom: number
  width: number
  height: number
  clip: number
  objects: SerializedObjectProps[]
  image?: string
}
