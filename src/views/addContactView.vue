<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useContactsStore } from "@/stores/ContactsStore";
import { IMaskDirective } from "vue-imask";

const router = useRouter();
const route = useRoute();

// eslint-disable-next-line
const props = defineProps({
  contacts: Array
});

// eslint-disable-next-line
const isCompleteInputPhone = defineModel('isCompleteInputPhone',{type: Boolean});
isCompleteInputPhone.value = true;
// eslint-disable-next-line
const isCompleteInputEmail = defineModel('isCompleteInputEmail',{type: Boolean});
isCompleteInputEmail.value = true;
// eslint-disable-next-line
const isCompleteInputName = defineModel('isCompleteInputName',{type: Boolean});
isCompleteInputName.value = true;

let contactsStore = useContactsStore();
let maskPhone = {
  mask: "{+7 (}000{) }000{-}00{-}00",
  lazy: true,
};
let inputName = "";
let inputEmail = "";
let inputPhone = "";
let id = parseInt(route.params.id);
let isEditMode = id > -1 ? true : false;
if (isEditMode) getContact(id);

function goHome() {
  router.push({ path: `/` });
}

function onAccept() {
  isCompleteInputPhone.value = false;
}

function onComplete() {
  isCompleteInputPhone.value = true;
}

function onChangeEmail(e) {
  try {
    const value = e.target.value;
    const domen = value.split("@")[1].split(".")[1];
    console.log(domen);
    if (domen === "ru" || domen === "com") isCompleteInputEmail.value = true;
    else isCompleteInputEmail.value = false;
  } catch (error) {
    isCompleteInputEmail.value = false;
  }
  console.log(isCompleteInputEmail);
}

function onChangeName(e) {
  const value = e.target.value;
  if (value.length > 2) isCompleteInputName.value = true;
  else isCompleteInputName.value = false;
}

function addContactInStore() {
  let Id = props.contacts.length;
  if (isCompleteInputPhone && isCompleteInputEmail && isCompleteInputName) {
    contactsStore.addContact(Id, inputName, inputEmail, inputPhone);
    router.push({ path: `/` });
  } else alert("Данные неверны или пустые, проверьте введенные данные!");
}

function editContactInStore(Id) {
  if (isCompleteInputPhone && isCompleteInputEmail && isCompleteInputName) {
    contactsStore.editContact(Id, inputName, inputEmail, inputPhone);
    router.push({ path: `/` });
  } else alert("Данные неверны или пустые, проверьте введенные данные!");
}

function getContact(Id) {
  let contact = contactsStore.getContact(Id);
  console.log(contact);
  inputName = contact.Name;
  inputEmail = contact.Email;
  inputPhone = contact.Phone;
}
</script>

<template>
  <div class="form-wrapper">
    <button class="form__btn-close" @click="goHome()">
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 2L2 34" stroke="#878499" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2 2L34 34" stroke="#878499" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div class="form">
      <h1 v-if="!isEditMode" class="form__title">Новый контакт</h1>
      <h1 v-if="isEditMode" class="form__title">Редактирование контакта</h1>
      <div class="form__body">
        <div class="form__name-wrapper form__input-wrapper">
          <label for="form-name__input" class="form-name__label form__label">Имя<span>*</span></label>
          <input
            id="form-name__input"
            type="text"
            @change="onChangeName"
            v-model="inputName"
            class="form-name__input form__input"
            :class="{
              'error-input': !isCompleteInputName,
            }"
            placeholder="Иванов Иван Иванович"
          />
        </div>
        <div class="form__email-wrapper form__input-wrapper">
          <label for="form-email__input" class="form-email__label form__label">Email<span>*</span></label>
          <input
            id="form-email__input"
            type="text"
            v-model="inputEmail"
            class="form-email__input form__input"
            :class="{
              'error-input': !isCompleteInputEmail,
            }"
            @change="onChangeEmail"
            placeholder="example@mail.com"
          />
        </div>
        <div class="form__phone-wrapper form__input-wrapper">
          <label for="form-phone__input" class="form-phone__label form__label">Телефон<span>*</span></label>
          <input
            id="form-phone__input"
            type="text"
            v-model="inputPhone"
            v-imask="maskPhone"
            @accept="onAccept()"
            @complete="onComplete()"
            class="form-phone__input form__input"
            :class="{
              'error-input': !isCompleteInputPhone,
            }"
            placeholder="+7 (999) 999-99-99"
          />
        </div>
      </div>
      <button v-if="!isEditMode" class="form__btn-add" @click="addContactInStore()">Добавить контакт</button>
      <button v-if="isEditMode" class="form__btn-add" @click="editContactInStore(id)">Изменить контакт</button>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    imask: IMaskDirective,
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: white;
}

.form__btn-close {
  position: absolute;
  right: 10%;
  top: 6%;
  padding: 10px;
  width: 52px;
  height: 52px;
  border: none;
  background: none;
}

.form__btn-close:hover {
  cursor: pointer;
}

.form__btn-close:hover svg path {
  stroke: var(--main-color);
}

.form {
  max-width: 540px;
  margin: 0 auto;
  padding-top: 10vh;
}

.form__title {
  margin: 0;
  font-weight: 700;
  font-size: 30px;
  line-height: 100%;
  color: var(--dark-color);
  margin-bottom: 30px;
}

.form__body {
  margin-bottom: 20px;
}

.form__input-wrapper {
  display: flex;
  flex-direction: column;
}

.form__input-wrapper:not(:last-child) {
  margin-bottom: 20px;
}

.form__label {
  display: flex;
  column-gap: 2px;
  margin-bottom: 5px;
  font-family: var(--second-family);
  font-weight: 700;
  font-size: 16px;
  color: var(--dark-color);
}

.form__label > span {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 16px;
  color: var(--main-color);
}

.form__input {
  border: 1px solid #eeecf4;
  background-color: white;
  border-radius: 16px;
  width: 100%;
  padding: 18px 20px;
  border-radius: 16px;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 16px;
}

.form__btn-add {
  padding: 21px 35px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
}

.form__btn-add:hover {
  cursor: pointer;
  color: var(--main-color);
  background-color: white;
  outline: 1px solid var(--main-color);
}

.error-input {
  border: 1px solid red;
}

.isOpen {
  display: block;
}
</style>
