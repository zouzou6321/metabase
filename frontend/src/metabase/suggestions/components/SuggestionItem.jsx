import React from 'react'
import Icon from 'metabase/components/Icon'
import { Link } from 'react-router'

const SuggestionItem = ({ recommendation, url }) =>
    <div className="bordered rounded shadowed text-grey-2 text-brand-hover no-decoration mb1 p2 bg-white"
    >
        <Link to={url} style={{ display: 'flex' }}>
            {recommendation}
        </Link>
    </div>

export default SuggestionItem
