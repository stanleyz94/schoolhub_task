<template>
  <q-page class="q-pa-md column">
    <div class="row items-center q-gutter-md">
      <q-input v-model="firstName" :label="t('firstName')" filled dense @keyup.enter="onAdd" />
      <q-input v-model="lastName" :label="t('lastName')" filled dense @keyup.enter="onAdd" />
      <q-btn color="primary" :label="t('add')" @click="onAdd" />
    </div>

    <q-separator class="q-my-md" />

    <q-table
      :grid="$q.screen.xs"
       :rows-per-page-label="t('recordsPerPage')"
      :pagination-label="paginationLabel"
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

      <!-- Grid template for mobile -->
      <template #item="props">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">{{ props.row.firstName }} {{ props.row.lastName }}</div>
              <div class="text-caption text-grey">ID: {{ props.row.id }}</div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn color="negative" flat dense icon="delete" @click="remove(props.row.id)" />
            </q-card-actions>
          </q-card>
        </div>
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

const paginationLabel = computed(() => {
  return (firstRowIndex, endRowIndex, totalRowsNumber) => {
    return t('paginationRange', { 
      start: firstRowIndex, 
      end: endRowIndex, 
      total: totalRowsNumber 
    })
  }
})


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


