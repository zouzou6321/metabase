import React from 'react'
import Icon from 'metabase/components/Icon'
import { Link } from 'react-router'

const SuggestionItem = ({ recommendation, url }) =>
    <div style={{
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        padding: '1em',
        boxShadow: '0 1px 2px rgba(0, 0, 0, .12)'
    }}>
        <Link to={url} style={{ display: 'flex' }}>
            {recommendation}
        </Link>
    </div>

export default SuggestionItem
