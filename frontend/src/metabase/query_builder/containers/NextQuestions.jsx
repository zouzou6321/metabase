import React from 'react'
import { connect } from 'react-redux'

import SuggestionCategory from 'metabase/suggestions/components/SuggestionCategory'

import {
    getSuggestions
} from 'metabase/suggestions/selectors'

const NextQuestions = ({ suggestions }) => {
    return (
        <div style={{ width: 300 }}>
            <ol style={{ listStyleType: 'none' }}>
                { suggestions.map((suggestion, index) =>
                    <li key={index} style={{ marginBottom: 10 }}>
                        <SuggestionCategory {...suggestion} />
                    </li>
                )}
            </ol>
        </div>
    )
}

const mapStateToProps = (state) => ({
    suggestions: getSuggestions(state)
})

export default connect(mapStateToProps)(NextQuestions)
