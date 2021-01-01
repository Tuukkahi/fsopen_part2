import React from 'react'

const PersonList = ({ persons, newFilter, handleDeleteName }) => {
    const toShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
        <div>
            {toShow.map(person => <p key={person.id}> {person.name} {person.number} <button value={person} onClick={handleDeleteName(person)}>delete</button> </p>)}
        </div>
    )
}

export default PersonList
