import { defineStore } from 'pinia'
import {
  watchStudents, watchClasses,
  addStudent as repoAddStudent,
  removeStudent as repoRemoveStudent,
  addClass as repoAddClass,
  removeClass as repoRemoveClass,
  assignStudentToClass as repoAssign,
  removeStudentFromClass as repoUnassign
} from 'src/services/schoolRepo'

export const useSchoolStore = defineStore('school', {
  state: () => ({
    students: [],           // { id: string, firstName, lastName }
    classes: [],            // { id: string, name, studentIds: string[] }
    _unsubs: []             // snapshot unsubscribers
  }),

  getters: {
    studentById: (state) => (id) => state.students.find(s => s.id === id),
    classById: (state) => (id) => state.classes.find(c => c.id === id),
    studentsForClass: (state) => (classId) => {
      const classItem = state.classes.find(c => c.id === classId)
      if (!classItem) return []
      return classItem.studentIds
        .map(id => state.students.find(s => s.id === id))
        .filter(Boolean)
    }
  },

  actions: {
    init() {
      if (this._unsubs.length) return
      const u1 = watchStudents(rows => { this.students = rows })
      const u2 = watchClasses(rows => { this.classes = rows })
      this._unsubs.push(u1, u2)
    },

    dispose() {
      this._unsubs.forEach(u => { try { u() } catch(error) {
        console.error('Failed to unsubscribe from Firebase listener:', error)
      } })
      this._unsubs = []
    },

    async addStudent(firstName, lastName) {
      const trimmedFirst = String(firstName || '').trim()
      const trimmedLast = String(lastName || '').trim()
      if (!trimmedFirst || !trimmedLast) return
      await repoAddStudent(trimmedFirst, trimmedLast)
    },

    async removeStudent(studentId) {
      await repoRemoveStudent(studentId)
    },

    async addClass(name) {
      const trimmed = String(name || '').trim()
      if (!trimmed) return
      await repoAddClass(trimmed)
    },

    async removeClass(classId) {
      await repoRemoveClass(classId)
    },

    async assignStudentToClass(studentId, classId) {
      await repoAssign(studentId, classId)
    },

    async removeStudentFromClass(studentId, classId) {
      await repoUnassign(studentId, classId)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept
}