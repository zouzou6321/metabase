import React from 'react'

const PageHeader = ({
    title,
    actions
}) =>
    <header className="wrapper py4 bg-white flex align-center">
        <h2>{title}</h2>
        { actions && (
            <div className="ml-auto flex align-center">
                {actions.map(action => action)}
            </div>
        )}
    </header>

export default PageHeader
