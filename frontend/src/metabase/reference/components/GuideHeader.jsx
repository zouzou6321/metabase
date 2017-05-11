import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";

import EditButton from "metabase/reference/components/EditButton.jsx";

import PageHeader from "metabase/components/page/PageHeader"

const GuideHeader = ({
    startEditing,
    isSuperuser
}) =>
    <PageHeader
        title="Start here"
        actions={[
            <span className="ml-auto">
                <EditButton startEditing={startEditing}/>
            </span>
        ]}
    />

/*
<div className="wrapper">
    <div className="flex align-center">
        <h1 className="text-dark" style={{fontWeight: 700}}>Start here.</h1>
    </div>
    <p className="text-paragraph text-measure">This is the perfect place to start if you’re new to your company’s data, or if you just want to check in on what’s going on.</p>
</div>;
*/
GuideHeader.propTypes = {
    startEditing: PropTypes.func.isRequired,
    isSuperuser: PropTypes.bool
};

export default pure(GuideHeader);
