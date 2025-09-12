<template>
  <q-page class="q-pa-md column">
    <div class="row items-center q-gutter-md">
      <q-input v-model="firstName" :label="t('firstName')" filled dense @keyup.enter="onAdd" />
      <q-input v-model="lastName" :label="t('lastName')" filled dense @keyup.enter="onAdd" />
      <q-btn color="primary" :label="t('add')" @click="onAdd" />
    </div>

    <q-separator class="q-my-md" />

    <q-table
      :title="t('students')"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      :pagination="{ rowsPerPage: 10 }"
      :no-data-label="t('noDataAvailable')"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="negative" flat dense icon="delete" @click="remove(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
  
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSchoolStore } from 'stores/school-store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = useSchoolStore()

const firstName = ref('')
const lastName = ref('')


const columns = computed(() => [
  { name: 'id', required: true, label: t('id'), align: 'left', field: 'id', sortable: true },
  { name: 'firstName', label: t('firstName'), field: 'firstName', sortable: true },
  { name: 'lastName', label: t('lastName'), field: 'lastName', sortable: true },
  { name: 'actions', label: t('actions'), field: 'actions' }
])

const rows = computed(() => store.students)

function onAdd() {
  store.addStudent(firstName.value, lastName.value)
  firstName.value = ''
  lastName.value = ''
}

function remove(id) {
  store.removeStudent(id)
}
</script>

<style scoped>
</style>


