<template>
  <div class="contact-table__item contact-item" @click="editContact(contact.Id)">
    <span class="contact-item__name">{{ contact.Name }}</span>
    <span class="contact-item__email">{{ contact.Email }}</span>
    <span class="contact-item__phone">{{ contact.Phone }}</span>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      requred: true,
      default: () => {},
    },
  },
  methods: {
    editContact(id) {
      this.$router.push({ path: `/editContact/${id}` });
    }
  },
};
</script>

<style scoped>
.contact-item {
  display: flex;
  column-gap: var(--column-gap-table);
  padding: 10px 0;
}

.contact-item__name,
.contact-item__email,
.contact-item__phone {
	font-weight: 400;
  font-size: 16px;
  line-height: 175%;
  color: var(--main-color);
}

.contact-item__name {
  width: var(--column-name-width);
  font-family: var(--font-family);
}

.contact-item__email {
	width: var(--column-email-width);
  font-family: var(--second-family);
}

.contact-item__phone {
	width: var(--column-phone-width);
  font-family: var(--second-family);
}

.contact-table__item:hover {
  cursor: pointer;
  outline: 1px solid var(--main-color);
  outline-offset: 5px;
  border-radius: 15px;
}
</style>
