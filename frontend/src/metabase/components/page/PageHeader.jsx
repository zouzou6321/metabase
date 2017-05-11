import React from 'react'

const PageHeader = ({
    title,
    actions
}) =>
    <header className="wrapper py4 bg-white">
        <div className="px2 flex align-center">
            <h2>{title}</h2>
            { actions && (
                <div className="ml-auto flex align-center">
                    {actions.map(action => action)}
                </div>
            )}
        </div>
    </header>

export default PageHeader
