import { defineStore } from "pinia";

export const useContactsStore = defineStore("сontactsStore", {
  state: () => ({
    contacts: [],
  }),
  actions: {
    addContact(Id, name, email, phone) {
      this.contacts.push({
        Id: Id,
        Name: name,
        Email: email,
        Phone: phone,
      });
    },
    editContact(Id, name, email, phone) {
      let indexContact = -1;
      this.contacts.forEach((el, index) => {
        if (el.Id === Id) indexContact = index;
      });
      if (indexContact > -1) {
        this.contacts[indexContact].Name = name;
        this.contacts[indexContact].Email = email;
        this.contacts[indexContact].Phone = phone;
        return { Status: 200, Message: "Контакт успешно отредактирован" };
      } else {
        return { Status: 404, Message: "Данный контакт не найден" }; 
      }
    },
    putContactsInStorage(array) {
      this.contacts = array;
      return this.contacts;
    }
  },
});
