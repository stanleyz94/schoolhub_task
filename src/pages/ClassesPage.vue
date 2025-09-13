<template>
  <q-page class="q-pa-md column">
    <div class="row items-center q-gutter-md">
      <q-input v-model="className" :label="t('className')" filled dense @keyup.enter="onAdd" />
      <q-btn color="primary" :label="t('add')" @click="onAdd" />
    </div>

    <q-separator class="q-my-md" />

    <q-table
      :grid="$q.screen.xs"
      :rows-per-page-label="t('recordsPerPage')"
      :pagination-label="paginationLabel"
      :title="t('classes')"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      :pagination="{ rowsPerPage: 10 }"
      :no-data-label="t('noDataAvailable')"
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

      <!-- Grid template for mobile -->
      <template #item="props">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">{{ props.row.name }}</div>
              <div class="text-caption text-grey">{{ t('students') }}: {{ props.row.studentIds.length }}</div>
             
            </q-card-section>
            <q-card-actions>
              <q-btn flat color="primary" :label="t('viewDetails')" @click="goToDetails(props.row.id)" />
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
import { useRouter } from 'vue-router'
import { useSchoolStore } from 'stores/school-store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter()
const store = useSchoolStore()

const className = ref('')


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
  { name: 'name', label: t('className'), field: 'name', sortable: true },
  { name: 'students', label: t('students'), field: 'students' },
  { name: 'actions', label: t('actions'), field: 'actions' }
])



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


