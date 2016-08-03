import React from 'react'
import SuggestionItem from "./SuggestionItem"

const SuggestionCategory = ({ categoryName, suggestions }) =>
    <div>
        <h4>{categoryName}</h4>
        {
            suggestions.map((suggestion, index) =>
                <SuggestionItem {...suggestion} key={index} />
            )
        }
    </div>

export default SuggestionCategory
