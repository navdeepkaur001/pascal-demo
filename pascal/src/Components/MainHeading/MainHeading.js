import React from 'react';
import './MainHeading.scss'

const MainHeading = (props) => {
    return (
        <>
            <div className="cm_title">
                <h2 className='heading'>{props.heading}<span>{props.text}</span></h2>
            </div>
        </>
    );
};

export default MainHeading;