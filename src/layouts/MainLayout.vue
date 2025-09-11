<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          School
        </q-item-label>
        <q-item clickable tag="router-link" :to="{ name: 'students' }">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Students</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" :to="{ name: 'classes' }">
          <q-item-section avatar>
            <q-icon name="class" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Classes</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
