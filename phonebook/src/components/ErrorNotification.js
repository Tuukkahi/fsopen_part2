import React from 'react'

const ErrorNotification = ({ message }) => {
    const style = {
        color: 'red',
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

export default ErrorNotification
