/* eslint "react/prop-types": "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";

import SetUserPassword from "./SetUserPassword.jsx";
import UpdateUserDetails from "./UpdateUserDetails.jsx";

import Page from 'metabase/components/page/Page'
import PageHeader from 'metabase/components/page/PageHeader'
import PageContent from 'metabase/components/page/PageContent'

export default class UserSettings extends Component {

    static propTypes = {
        tab: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
        setTab: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        updatePassword: PropTypes.func.isRequired,
    };

    onUpdatePassword(details) {
        this.props.updatePassword(details.user_id, details.password, details.old_password);
    }

    onUpdateDetails(user) {
        this.props.updateUser(user);
    }

    render() {
        const { tab, user, setTab } = this.props;
        const nonSSOManagedAccount = !user.google_auth

        return (
            <Page>
                <PageHeader title="Account settings" />
                { nonSSOManagedAccount && (
                    <div className="wrapper">
                        <a onClick={() => setTab('details')}>
                            User Details
                        </a>

                        <a onClick={() => setTab('password')}>
                            Password
                        </a>
                    </div>
                )}
                <PageContent>
                    <div className="text-measure">
                    { tab === 'details' ?
                        <UpdateUserDetails
                            submitFn={this.onUpdateDetails.bind(this)}
                            {...this.props}
                        />
                    : tab === 'password' ?
                        <SetUserPassword
                            submitFn={this.onUpdatePassword.bind(this)}
                            {...this.props}
                        />
                    : null }
                    </div>
                </PageContent>
            </Page>
        );
    }
}
