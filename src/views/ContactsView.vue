<template>
  <!-- <popupFormContactComponent @isOpenPopupForm="(n) => (isOpenPopupForm = n)" :isOpenPopupForm="isOpenPopupForm" :idContact="contacts.length" :typePopup="typePopup" :selectedContact="selectedContact"></popupFormContactComponent> -->
  <div class="contacts">
    <headerComponent></headerComponent>
    <div class="contacts__table contacts-table">
      <div class="contacts-table__header">
        <span class="contacts-table__header-name" @click="nameFiltering()">
          Имя
          <svg v-if="isFilteredName === 'reverse'" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.7273 8.5L3.86366 11.5M3.86366 11.5L1.00002 8.5M3.86366 11.5L3.86366 1" stroke="#7D7B8E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-if="isFilteredName === 'corrently'" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4L3.86364 1M3.86364 1L6.72727 4M3.86364 1V11.5" stroke="#7D7B8E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="contacts-table__header-email">Email</span>
        <span class="contacts-table__header-phone">Телефон</span>
      </div>
      <div class="contacts-table__body">
        <contactComponent v-for="contact in filteredContacts" :key="contact.Id" :contact="contact"></contactComponent>
      </div>
    </div>
  </div>
</template>

<script>
import contactComponent from "@/components/contactComponent.vue";
import headerComponent from "@/components/headerComponent.vue";
// import { useContactsStore } from "@/stores/ContactsStore";

export default {
  props: {
    contacts: Array,
  },
  components: {
    headerComponent,
    contactComponent,
  },
  data() {
    return {
      selectedContact: {},
      typePopup: "",
      isOpenPopupForm: false,
      contactsStore: [],
      filteredContacts: [],
      filterStatuses: ["corrently", "reverse"],
      isFilteredName: "corrently",
    };
  },
  created() {
    this.contactsStore = this.contacts;
    this.nameFiltering();
  },
  watch: {
    contacts(e) {
      // console.log(e);
      this.contactsStore = e;
      this.nameFiltering();
    },
  },
  methods: {
    nameFiltering() {
      let index = this.filterStatuses.findIndex((el) => el === this.isFilteredName);
      if (index === this.filterStatuses.length - 1) index = 0;
      else index++;
      this.isFilteredName = this.filterStatuses[index++];
      switch (this.isFilteredName) {
        case "reverse":
          this.filteredContacts = this.contactsStore.sort((a, b) => {
            const nameA = a.Name.toUpperCase();
            const nameB = b.Name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        case "corrently":
          this.filteredContacts = this.contactsStore.sort((a, b) => {
            const nameA = a.Name.toUpperCase();
            const nameB = b.Name.toUpperCase();
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
          });
          break;
      }
      // console.log(this.filteredContacts);
    },
  },
};
</script>

<style scoped>
.contacts {
  max-width: 1170px;
  padding: 0 20px;
  padding-top: 58px;
  margin: 0 auto;
}

.contacts-table__header {
  display: flex;
  column-gap: var(--column-gap-table);
  margin-bottom: 10px;
}

.contacts-table__header-name,
.contacts-table__header-email,
.contacts-table__header-phone {
  font-weight: 400;
  font-size: 18px;
  line-height: 156%;
  color: var(--header-table-color);
}

.contacts-table__header-name {
  width: var(--column-name-width);
}

.contacts-table__header-name:hover {
  color: var(--main-color);
  cursor: pointer;
}

.contacts-table__header-name:hover svg path {
  stroke: var(--main-color);
}

.contacts-table__header-email {
  width: var(--column-email-width);
}

.contacts-table__header-phone {
  width: var(--column-phone-width);
}
</style>
