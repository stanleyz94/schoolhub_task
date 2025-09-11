import { defineStore, acceptHMRUpdate } from 'pinia'

// Simple in-memory IDs
let nextStudentId = 1
let nextClassId = 1

export const useSchoolStore = defineStore('school', {
  state: () => ({
    students: [
      // { id, firstName, lastName }
    ],
    classes: [
      // { id, name, studentIds: number[] }
    ]
  }),

  getters: {
    studentById: (state) => (id) => state.students.find(s => s.id === id),
    classById: (state) => (id) => state.classes.find(c => c.id === id),
    studentsForClass: (state) => (classId) => {
      const clazz = state.classes.find(c => c.id === classId)
      if (!clazz) return []
      return clazz.studentIds.map(id => state.students.find(s => s.id === id)).filter(Boolean)
    }
  },

  actions: {
    addStudent(firstName, lastName) {
      const trimmedFirst = String(firstName || '').trim()
      const trimmedLast = String(lastName || '').trim()
      if (!trimmedFirst || !trimmedLast) return
      this.students.push({ id: nextStudentId++, firstName: trimmedFirst, lastName: trimmedLast })
    },

    removeStudent(studentId) {
      this.students = this.students.filter(s => s.id !== studentId)
      this.classes.forEach(c => {
        c.studentIds = c.studentIds.filter(id => id !== studentId)
      })
    },

    addClass(name) {
      const trimmed = String(name || '').trim()
      if (!trimmed) return
      this.classes.push({ id: nextClassId++, name: trimmed, studentIds: [] })
    },

    assignStudentToClass(studentId, classId) {
      const clazz = this.classes.find(c => c.id === classId)
      if (!clazz) return
      if (!clazz.studentIds.includes(studentId)) {
        clazz.studentIds.push(studentId)
      }
    },

    removeStudentFromClass(studentId, classId) {
      const clazz = this.classes.find(c => c.id === classId)
      if (!clazz) return
      clazz.studentIds = clazz.studentIds.filter(id => id !== studentId)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSchoolStore, import.meta.hot))
}


