import { defineBoot } from '#q-app/wrappers'
import { useSchoolStore } from 'stores/school-store'

export default defineBoot(() => {
  const store = useSchoolStore()
  store.init()
})