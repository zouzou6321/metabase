import cxs from 'cxs';
import React from 'react';

import { normal } from 'metabase/lib/colors'

const Card = ({ name }) =>
    <div className={cxs({
        borderRadius: 4,
        backgroundColor: normal.blue,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150
    })}>
        <h3>{name}</h3>
    </div>


export default Card;
