import { genMessage } from '../helper'

const modulesFiles = import.meta.glob<Recordable>('./en/**/*.json', {
  eager: true
})

export default {
  message: {
    ...genMessage(modulesFiles, 'en')
  },
  dateLocale: null,
  dateLocaleName: 'en'
}
