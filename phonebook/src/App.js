import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import ErrorNotification from './components/ErrorNotification'
import GreenNotification from './components/GreenNotification'

import personService from './services/Contacts'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [greenMessage, setGreenMessage] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault()
        const newPerson = { name: newName,  number: newNumber}
        if (persons.some(person => newName === person.name)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
                personService.update(persons.filter(person => newName === person.name)[0].id, newPerson)
                    .then(request => {
                        setPersons(persons.filter(person => person.id !== request.id).concat(request))
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${newName} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        } else {
            //const newPersons = persons.concat(newPerson)
            personService.create(newPerson).then(request => {
                setPersons(persons.concat(request))
                setNewName('')
                setNewNumber('')
                setGreenMessage(`Added ${newPerson.name}`)
                setTimeout(() => {
                    setGreenMessage(null)
                }, 5000)
            })
        }
    }

    const handleDeleteName = (toDelete) => () =>  {
        if (window.confirm(`Delete ${toDelete.name}?`)) {
            personService.remove(toDelete.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== toDelete.id))
                    setGreenMessage(`Deleted ${toDelete.name}`)
                    setTimeout(() => {
                        setGreenMessage(null)
                    }, 5000)
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <ErrorNotification message={errorMessage} />
            <GreenNotification message={greenMessage} />
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <PersonList persons={persons} newFilter={newFilter} handleDeleteName={handleDeleteName} />
        </div>
    )
}

export default App
