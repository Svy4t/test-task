<template>
  <div class="contacts__header">
    <h1 class="contacts__header-title">Мои контакты</h1>
    <button class="contacts__btn" @click="goAddContact()">
      Добавить
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1V11M1 6H11" stroke="#4932D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    goAddContact() {
      this.$emit('isOpenPopupForm', true); 
      this.$emit('typePopup', 'add');
    },
  },
};
</script>

<style scoped>
.contacts__header {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 15px; 
  line-height: 100%;
  color: var(--dark-color);
  margin-bottom: 30px;
}

.contacts__header-title {
  margin: 0;
  margin-right: 30px;
}

.contacts__btn {
  display: flex;
  column-gap: 10px;
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  background-color: #edebf8;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--main-color);
}

.contacts__btn:hover {
  cursor: pointer;
  color: #edebf8;
  background-color: var(--main-color);
}

.contacts__btn:hover svg path {
  stroke: #edebf8
}
</style>
