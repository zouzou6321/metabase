
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Greeting from "metabase/lib/greeting";
import Modal from "metabase/components/Modal.jsx";

import Activity from "../components/Activity.jsx";
import RecentViews from "../components/RecentViews.jsx";
import Smile from '../components/Smile.jsx';
import NewUserOnboardingModal from '../components/NewUserOnboardingModal.jsx';
import NextStep from "../components/NextStep.jsx";

import * as homepageActions from "../actions";
import { getActivity, getRecentViews, getUser } from "../selectors";

import Page from "metabase/components/page/Page"
import PageHeader from "metabase/components/page/PageHeader"
import PageContent from "metabase/components/page/PageContent"

const mapStateToProps = (state, props) => {
    return {
        activity:       getActivity(state),
        recentViews:    getRecentViews(state),
        user:           getUser(state),
        showOnboarding: "new" in props.location.query
    }
}

import { push } from "react-router-redux";

const mapDispatchToProps = {
    ...homepageActions,
    onChangeLocation: push
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HomepageApp extends Component {

    static propTypes = {
        onChangeLocation: PropTypes.func.isRequired,
        showOnboarding: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        activity: PropTypes.array,
        recentViews: PropTypes.array,
        fetchActivity: PropTypes.func.isRequired,
        fetchRecentViews: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            greeting: Greeting.sayHello(props.user && props.user.first_name),
            onboarding: props.showOnboarding
        };

        this.styles = {
            headerGreeting: {
                fontSize: "x-large"
            }
        };
    }

    completeOnboarding() {
        this.setState({ onboarding: false });
    }

    render() {
        const { user } = this.props;

        return (
            <Page>
                { this.state.onboarding ?
                    <Modal>
                        <NewUserOnboardingModal
                            user={user}
                            onClose={() => (this.completeOnboarding())}
                        />
                    </Modal>
                : null }
                <PageHeader title={this.state.greeting} />
                <PageContent>
                    <div className="flex">
                        <div style={{ flex: '66.66%' }}>
                            <Activity {...this.props} />
                        </div>
                        <div style={{ flex: '33.33%' }}>
                            <NextStep />
                            <RecentViews {...this.props} />
                        </div>
                    </div>
                </PageContent>
            </Page>
        );
    }
}
