import React from 'react'
import Icon from 'metabase/components/Icon'

const SuggestionItem = ({ name, url }) =>
    <div style={{
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        padding: '1em',
        boxShadow: '0 1px 2px rgba(0, 0, 0, .12)'
    }}>
        <a href='/card/1' style={{ display: 'flex' }}>
            {name}
            <Icon name='close' style={{ marginLeft: 'auto' }} />
        </a>
    </div>

export default SuggestionItem
