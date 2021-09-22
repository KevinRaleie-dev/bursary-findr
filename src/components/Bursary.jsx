import React from 'react';

// components
import { Card } from './Card';
import { Error } from './Error';
import { Loading } from './Loading';

export const Bursary = ({data, error, search}) => {

    if (!search) {
        return <div></div>
    }

    if (error) {
        return <Error message="Are you sure you searching for the right thing?" />
    }

    if (!data) {
        return <Loading />
    }


    return( <React.Fragment>
        {/* loop through the bursary list and pass in the data to card component */}
        <div className="px-10 py-5">
            <h3 className="my-5 text-2xl font-black">{data.title}</h3>
            <div className="grid grid-flow-row grid-cols-3 gap-4">
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
        </div>
    </React.Fragment>);
}
