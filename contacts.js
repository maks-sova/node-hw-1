const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");


const contactsPath = path.join(__dirname, "db/contacts.json");

const getListContacts = async()=> {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
const getContactById = async (id) => {
  const contacts = await getListContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}
const addListContact = async (name, email, phone) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts,null, 2));
  return newContact;
}

const removeContact = async (id) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  };
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
module.exports = {
  getListContacts,
  getContactById,
  addListContact,
  removeContact,
}
