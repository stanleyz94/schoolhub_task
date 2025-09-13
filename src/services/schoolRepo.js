import {
    collection, addDoc, deleteDoc, doc, getDocs, onSnapshot,
    updateDoc, arrayUnion, arrayRemove, query, where
  } from 'firebase/firestore'
  import { db } from 'boot/firebase'
  
  const studentsCol = collection(db, 'students')
  const classesCol = collection(db, 'classes')
  
  export function watchStudents(cb) {
    return onSnapshot(studentsCol, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      cb(rows)
    })
  }
  
  export function watchClasses(cb) {
    return onSnapshot(classesCol, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      cb(rows)
    })
  }
  
  export async function addStudent(firstName, lastName) {
    return addDoc(studentsCol, { firstName, lastName })
  }
  
  export async function removeStudent(studentId) {
    const classesWithStudent = query(classesCol, where('studentIds', 'array-contains', studentId))
    const snap = await getDocs(classesWithStudent)
    await Promise.all(snap.docs.map(d => updateDoc(doc(db, 'classes', d.id), {
      studentIds: arrayRemove(studentId)
    })))
    await deleteDoc(doc(db, 'students', studentId))
  }
  
  export async function addClass(name) {
    return addDoc(classesCol, { name, studentIds: [] })
  }
  
  export async function removeClass(classId) {
    return deleteDoc(doc(db, 'classes', classId))
  }
  
  export async function assignStudentToClass(studentId, classId) {
    return updateDoc(doc(db, 'classes', classId), { studentIds: arrayUnion(studentId) })
  }
  
  export async function removeStudentFromClass(studentId, classId) {
    return updateDoc(doc(db, 'classes', classId), { studentIds: arrayRemove(studentId) })
  }