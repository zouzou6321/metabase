import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Text from '../components/Text';
import Tip from '../components/Tip';
import Title from '../components/Title';
import { Sidebar } from '../components/Layout';

import { back } from '../actions';

const mapStateToProps = (state) => ({
    advance: state.newQuestion.advance,
    back: state.newQuestion.currentStep.back || true,
    component: state.newQuestion.currentStep.component,
    subtitle: state.newQuestion.currentStep.subtitle,
    tip: state.newQuestion.currentStep.tip,
    title: state.newQuestion.flow.title,
})

const mapDispatchToProps = ({
    goBack: back,
})

@connect(mapStateToProps, mapDispatchToProps)
class NewQuestion extends Component {
    render () {
        const { back, goBack, component, tip, title, subtitle } = this.props;
        const CurrentStep = component
        return (
            <div className="wrapper py4">

                { back && <div onClick={() => goBack()}>Back</div> }
                <Title>{title}</Title>
                { subtitle && <Text>{subtitle}</Text> }

                <div className="flex mt4">
                    <div className={cxs({ flex: 1 })}>
                        <CurrentStep />
                    </div>

                    { tip && (
                        <Sidebar>
                            <Tip tip={tip} />
                        </Sidebar>
                    )}
                </div>
            </div>
        );
    }
}

export default NewQuestion;
