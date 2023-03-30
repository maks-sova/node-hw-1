const contacts = require("./contacts");

const yargs = require("yargs");

const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.getListContacts();
            return console.log(allContacts)
        case "get":
            const oneContact = await contacts.getContactById(id);
            return console.log(oneContact)
        case "add":
            const addContact = await contacts.addListContact(name, email, phone);
            return console.log(addContact)
          case "remove":
            const deleteContact = await contacts.removeContact(id);
            return console.log(deleteContact)
    }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);



