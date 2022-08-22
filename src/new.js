'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('hod_data')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("hod_data", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
    
    if (isValidFields()) {
        const client = {
            name: document.getElementById('nome').value,
            experiance: document.getElementById('email').value,
            register_no: document.getElementById('celular').value,
           
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            msg.innerHTML = "<h2 style='color:#145858'>Data Inserted!</h2>";
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            msg.innerHTML ="<h2 style='color:#145858'>Data Updated!</h2>";
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.experiance}</td>
        <td>${client.register_no}</td>
       
        <td>
            <button type="button" class="button green " id="edit-${index}">EDIT</button>
            <button type="button" class="button red " id="delete-${index}" >DELETE</button>
        </td>
    `
   /*  `<i onclick = "edit(this),openForm()" class="fa-solid fa-pen-to-square editIcon" ></i>
                            <i onclick = "dltForm()" class="fa-solid fa-trash-can deleteBtn" ></i>`
    */     
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.name
    document.getElementById('email').value = client.experiance
    document.getElementById('celular').value = client.register_no
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response =  confirm(`Are You Sure You Want To Delete? ${client.name}`)
                     if (response) {
                deleteClient(index)
                msg.innerHTML = "<h2 style='color:red'>You have Deleted a Row!</h2>";
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)