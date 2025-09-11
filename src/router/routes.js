const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'students', name: 'students', component: () => import('pages/StudentsPage.vue') },
      { path: 'classes', name: 'classes', component: () => import('pages/ClassesPage.vue') },
      { path: 'classes/:id', name: 'class-details', component: () => import('pages/ClassDetailsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
