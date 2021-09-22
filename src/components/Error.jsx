import React from 'react'

export const Error = ({message}) => {
    return (
        <div className="grid place-items-center p-5">
            <p className="font-medium">{message}</p>
        </div>
    )
}
