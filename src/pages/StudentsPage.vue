<template>
  <q-page class="q-pa-md column">
    <div class="row items-center q-gutter-md">
      <q-input v-model="firstName" label="First name" filled dense @keyup.enter="onAdd" />
      <q-input v-model="lastName" label="Last name" filled dense @keyup.enter="onAdd" />
      <q-btn color="primary" label="Add" @click="onAdd" />
    </div>

    <q-separator class="q-my-md" />

    <q-table
      title="Students"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      :pagination="{ rowsPerPage: 10 }"
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

const store = useSchoolStore()

const firstName = ref('')
const lastName = ref('')

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'firstName', label: 'First Name', field: 'firstName', sortable: true },
  { name: 'lastName', label: 'Last Name', field: 'lastName', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions' }
]

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


