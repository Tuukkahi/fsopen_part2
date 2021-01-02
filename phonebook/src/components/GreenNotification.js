import React from 'react'

const GreenNotification = ({ message }) => {
    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    if (message !== null) {
        return (
            <div style={style}>
                {message}
            </div>
        )
    } 

    return null
}

export default GreenNotification
