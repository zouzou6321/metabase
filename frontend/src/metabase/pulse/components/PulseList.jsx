import React, { Component } from "react";

import PulseListItem from "./PulseListItem.jsx";
import WhatsAPulse from "./WhatsAPulse.jsx";
import SetupModal from "./SetupModal.jsx";

import Page from 'metabase/components/page/Page'
import PageHeader from 'metabase/components/page/PageHeader'
import PageContent from 'metabase/components/page/PageContent'

import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper.jsx";
import Modal from "metabase/components/Modal.jsx";

import _ from "underscore";

export default class PulseList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showSetupModal: false
        };

        _.bindAll(this, "create");
    }

    static propTypes = {};
    static defaultProps = {};

    componentDidMount() {
        this.props.fetchPulses();
        this.props.fetchPulseFormInput();
    }

    create() {
        let hasConfiguredChannel = !this.props.formInput.channels || _.some(Object.values(this.props.formInput.channels), (c) => c.configured);
        if (hasConfiguredChannel) {
            this.props.onChangeLocation("/pulse/create");
        } else {
            this.setState({ showSetupModal: true });
        }
    }

    render() {
        let { pulses, user } = this.props;
        return (
            <Page>
                <PageHeader
                    title="Pulses"
                    actions={[
                        <a onClick={this.create} className="ml-auto">Create a pulse</a>
                    ]}
                />
                <PageContent>
                    <LoadingAndErrorWrapper loading={!pulses}>
                    { () => pulses.length > 0 ?
                            <ol>
                                {pulses.slice().sort((a,b) => b.created_at - a.created_at).map(pulse =>
                                    <li key={pulse.id}>
                                        <PulseListItem
                                            scrollTo={pulse.id === this.props.pulseId}
                                            pulse={pulse}
                                            user={user}
                                            formInput={this.props.formInput}
                                            savePulse={this.props.savePulse}
                                        />
                                    </li>
                                )}
                            </ol>
                    :
                        <div className="mt4 ml-auto mr-auto">
                            <WhatsAPulse
                                button={<a onClick={this.create} className="Button Button--primary">Create a pulse</a>}
                            />
                        </div>
                    }
                    </LoadingAndErrorWrapper>
                </PageContent>
                <Modal isOpen={this.state.showSetupModal}>
                    <SetupModal
                        user={user}
                        onClose={() => this.setState({ showSetupModal: false })}
                        onChangeLocation={this.props.onChangeLocation}
                    />
                </Modal>
            </Page>
        );
    }
}
