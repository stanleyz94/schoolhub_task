<template>
  <q-page class="q-pa-md column q-gutter-md">
    <div class="text-h5">{{ t('class') }}: {{ currentClass?.name || t('notFound')  }}</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section class="text-subtitle1">{{ t('assignedStudents') }}</q-card-section>
          <q-separator />
          <q-list v-if="assigned.length">
            <q-item v-for="s in assigned" :key="s.id">
              <q-item-section>{{ s.firstName }} {{ s.lastName }}</q-item-section>
              <q-item-section side>
                <q-btn dense flat color="negative" icon="remove" @click="unassign(s.id)" />
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else class="q-pa-md text-grey">{{ t('noStudentsAssigned') }}</div>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section class="text-subtitle1">{{ t('availableStudents') }}</q-card-section>
          <q-separator />
          <q-list v-if="available.length">
            <q-item v-for="s in available" :key="s.id">
              <q-item-section>{{ s.firstName }} {{ s.lastName }}</q-item-section>
              <q-item-section side>
                <q-btn dense flat color="primary" icon="add" @click="assign(s.id)" />
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else class="q-pa-md text-grey">{{ t('noAvailableStudents') }}</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSchoolStore } from 'stores/school-store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute()
const store = useSchoolStore()

const classId = computed(() => Number(route.params.id))
const currentClass = computed(() => store.classById(classId.value))

const assigned = computed(() => store.studentsForClass(classId.value))
const available = computed(() => store.students.filter(s => !currentClass.value?.studentIds.includes(s.id)))

function assign(studentId) {
  store.assignStudentToClass(studentId, classId.value)
}

function unassign(studentId) {
  store.removeStudentFromClass(studentId, classId.value)
}
</script>

<style scoped>
</style>


