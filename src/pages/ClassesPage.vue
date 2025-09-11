<template>
  <q-page class="q-pa-md column">
    <div class="row items-center q-gutter-md">
      <q-input v-model="className" label="Class name" filled dense @keyup.enter="onAdd" />
      <q-btn color="primary" label="Add" @click="onAdd" />
    </div>

    <q-separator class="q-my-md" />

    <q-table
      title="Classes"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      :pagination="{ rowsPerPage: 10 }"
    >
      <template #body-cell-name="props">
        <q-td :props="props">
          <q-btn flat color="primary" :label="props.row.name" @click="goToDetails(props.row.id)" />
        </q-td>
      </template>
      <template #body-cell-students="props">
        <q-td :props="props">
          {{ props.row.studentIds.length }}
        </q-td>
      </template>
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
import { useRouter } from 'vue-router'
import { useSchoolStore } from 'stores/school-store'

const router = useRouter()
const store = useSchoolStore()

const className = ref('')

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'name', label: 'Class Name', field: 'name', sortable: true },
  { name: 'students', label: 'Students', field: 'students' },
  { name: 'actions', label: 'Actions', field: 'actions' }
]

const rows = computed(() => store.classes)

function onAdd() {
  store.addClass(className.value)
  className.value = ''
}

function remove(id) {
  // Optionally implement class removal; for now, filter it out
  store.classes = store.classes.filter(c => c.id !== id)
}

function goToDetails(id) {
  router.push({ name: 'class-details', params: { id: String(id) } })
}
</script>

<style scoped>
</style>


