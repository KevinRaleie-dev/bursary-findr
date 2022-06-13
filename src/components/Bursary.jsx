import React from 'react';

// components
import { Card } from './Card';
import { Error, Message } from './Error';
import { Loading } from './Loading';

export const Bursary = ({data, error, search}) => {
    if (!search) {
        return '';
    }

    if (error) {
        return <Error message={error.message} />
    }

    if (!data) {
        return <Loading />
    }

    return( <React.Fragment>
        {/* loop through the bursary list and pass in the data to card component */}
        <div className="px-2 py-2 sm:px-10 sm:py-5">
            {!data.title ? <>
               <Message
                text="Bursaries for this month are not available anymore."
                />
            </>
            :
            <>
            <h3 className="my-5 text-xl sm:text-2xl font-black">{data.title}</h3>
            <div className="flex flex-col sm:grid sm:grid-flow-row sm:grid-cols-3 sm:gap-4">
            {data.bursaryList.map((bursary, idx) => (    
                <Card
                key={idx} 
                imageUrl={`https://avatars.dicebear.com/api/identicon/${bursary.name}.svg`}
                link={bursary.link}
                name={bursary.name}
                closingDate={bursary.closing}
                />
            ))}
            </div>
            </>
            }    
        </div>
    </React.Fragment>);
}
