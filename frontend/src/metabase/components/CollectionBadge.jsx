/* @flow */

import React, { Component, PropTypes } from "react";

import { Link } from "react-router";
import Icon from "metabase/components/Icon";
import Urls from "metabase/lib/urls";

type Props = {
};

const CollectionBadge = ({ collection }: Props) =>
    <Link
        to={Urls.collection(collection)}
        className="flex align-center no-decoration text-uppercase text-bold h6"
        style={{ color: collection.color}}
    >
        <Icon name="collection" className="mr1" />
        {collection.name}
    </Link>

export default CollectionBadge;
