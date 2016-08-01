import React from 'react'
import { connect } from 'react-redux'

import NextQuestionItem from '../next_questions/NextQuestionItem'

const NextQuestions = ({ suggestions }) => {
    return (
        <div style={{ width: 300 }}>
            <h4>Related questions</h4>
            <ol style={{ listStyleType: 'none' }}>
                { suggestions.map((suggestion, index) =>
                    <li key={index} style={{ marginBottom: 10 }}>
                        <NextQuestionItem {...suggestion} />
                    </li>
                )}
            </ol>
        </div>
    )
}

const mapStateToProps = (state) => ({
    suggestions: [{ name: 'Card 1', url: '1' }, { name: 'Card 2', url: '2'}]
})

export default connect(mapStateToProps)(NextQuestions)
