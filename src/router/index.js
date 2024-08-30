import { createRouter, createWebHistory } from 'vue-router'
import ContactsView from '../views/ContactsView.vue'
import AddContactView from '../views/addContactView.vue'

const routes = [
  {
    path: '/',
    name: 'contacts',
    component: ContactsView
  },
  {
    path: '/editContact/:id',
    name: 'editContact',
    component: AddContactView
  },
  {
    path: '/addContact',
    name: 'addContact',
    component: AddContactView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
