import React from 'react'
import SuggestionItem from "./SuggestionItem"

const SuggestionCategory = ({ categoryName, suggestions }) =>
    <div className="mb2">
        <h4 className="mb1">{categoryName}</h4>
        {
            suggestions.map((suggestion, index) =>
                <SuggestionItem {...suggestion} key={index} />
            )
        }
    </div>

export default SuggestionCategory
