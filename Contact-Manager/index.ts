import fs from "fs";

interface Contact {
    name : string
    phone : string
}

const contacts : Contact[] =[];

const [, , command, ...args] = process.argv;

//helper function

const FILE_PATH ="contacts.json";
function loadContacts(): Contact[]{
    if(!fs.existsSync(FILE_PATH)) {
        return[];
    }
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

function saveContacts(contacts: Contact[]) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));
}


function addContact(name:string, phone:string) {
    if (command === "add") {
  const contacts = loadContacts();

  contacts.push({ name, phone });
  saveContacts(contacts);

  console.log(`✅ Contact added: ${name}`);
}
}


function listContacts(){
    if (command === "list"){

        const contacts = loadContacts();

        if(contacts.length == 0){
        console.log("No Contacts found")
        return;
    }
    console.log("Contact List:")
    //use foreach loop

    contacts.forEach((c,index) => {
        console.log(`${index+1}.${c.name} ${c.phone}`);
    });
    }
}
function searchContact(name:string){
   if(command === "search"){
     const contacts = loadContacts();
     const contact = contacts.find(
        c => c.name.toLowerCase() === name.toLowerCase()
    );
    if(!contact){
        console.log("No Contact Found");
        return;
    }
    console.log(`Contact Found: ${contact.name}${contact.phone}`);
}
   }
function deleteContact(name:string){
    const index = contacts.findIndex(
        c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (index === -1){
        console.log("Contact not found")
        return;
    }
    contacts.splice(index,1);
    console.log(`Contact deleted ${name}`)

}
switch (command) {
    case "add":
        if (typeof args[0] === "string" && typeof args[1] === "string") {
            addContact(args[0], args[1]);
        } else {
            console.log("Please provide both name and phone to add a contact.");
        }
        break;
    case "list":
        listContacts();
        break;
    case "search":
        if (typeof args[0] === "string") {
            searchContact(args[0]);
        } else {
            console.log("Please provide a name to search for a contact.");
        }
        break;
    case "delete":
        if (typeof args[0] === "string") {
            deleteContact(args[0]);
        } else {
            console.log("Please provide a name to delete a contact.");
        }
        break;

    default: 
      console.log(`
        Contact Manager CLI
        Commands:
        add <name> <phone> Add Contact
        list    list all contacts
        search <name> Search Contact
        delete <name> delete Contact`);
}
