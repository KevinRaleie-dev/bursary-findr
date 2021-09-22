import React from 'react'

export const Card = ({imageUrl, closingDate, name, link, key}) => {

    return (
        <React.Fragment>
            <a href={`${link}`} key={key}>
                <div className="flex flex-row items-center p-2 w-96 h-16 border rounded-md">
                    <div>
                        <img className="w-auto h-14 p-2 rounded-md" src={imageUrl} alt={name} />
                    </div>
                    <div className="flex flex-col justify-evenly truncate p-2">
                        <p className=" font-light">{name}</p>
                        <p className="text-sm text-gray-500">{closingDate}</p>
                    </div>
                </div>
            </a>
        </React.Fragment>
    )
}

