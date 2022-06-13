import React from 'react'

export const Error = ({message}) => {
    if(message.includes('429')) {
        return <Message text='Too many requests, please try again after 5 minutes.' />
    }

    if(message.includes('400')) {
        return <Message text="Are you sure you're searching the right thing?"/>
    }

    if (message.includes('500')) {
        return <Message text="Bursaries for this month are not available yet... ☹️"/>
    }
    
    return (
        <Message text={message} />
    );
}

export const Message = ({text}) => {
    return (
        <div className="grid place-items-center p-5">
            <p className="font-medium text-center text-gray-700">{text}</p>
        </div>
    );
}
