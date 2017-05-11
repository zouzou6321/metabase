/* @flow */
/* eslint "react/prop-types": "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

import FormField from "metabase/components/form/FormField.jsx";
import FormLabel from "metabase/components/form/FormLabel.jsx";
import FormMessage from "metabase/components/form/FormMessage.jsx";

import MetabaseUtils from "metabase/lib/utils";

import Input from 'metabase/components/Input'

import _ from "underscore";
import cx from 'classnames'

type Props = {
    submitFn: Function,
    user: Object,
    updateUserResult: Object
}

export default class UpdateUserDetails extends Component {

    state = {
        formError: null,
        valid: false
    }

    static propTypes = {
        submitFn: PropTypes.func.isRequired,
        user: PropTypes.object,
        updateUserResult: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.validateForm();
    }

    validateForm() {
        let { valid } = this.state;
        let isValid = true;

        // required: first_name, last_name, email
        for (var fieldName in this.refs) {
            let node = findDOMNode(this.refs[fieldName]);
            if (node.required && MetabaseUtils.isEmpty(node.value)) isValid = false;
        }

        if(isValid !== valid) {
            this.setState({
                'valid': isValid
            });
        }
    }

    onChange = () => {
        this.validateForm();
    }

    formSubmitted = (event) => {
        event.preventDefault();

        this.setState({
            formError: null
        });

        let formErrors = {data:{errors:{}}};

        // validate email address
        if (!MetabaseUtils.validEmail(findDOMNode(this.refs.email).value)) {
            formErrors.data.errors.email = "Not a valid formatted email address";
        }

        if (_.keys(formErrors.data.errors).length > 0) {
            this.setState({
                formError: formErrors
            });
            return;
        }

        let user = (this.props.user) ? _.clone(this.props.user) : {};

        user.first_name = findDOMNode(this.refs.firstName).value;
        user.last_name = findDOMNode(this.refs.lastName).value;
        user.email = findDOMNode(this.refs.email).value;

        this.props.submitFn(user);
    }

    render() {
        const { updateUserResult, user } = this.props;
        const { formError, valid } = this.state;
        const managed = user.google_auth

        const FIELDS = [
            {
                name: "first_name",
                title: "First name",
                placeholder: "Johnny",
                ref: "firstName"
            },
            {
                name: "last_name",
                title: "Last name",
                placeholder: "Appleseed",
                ref: "lastName"
            },
        ]

        return (
            <form onSubmit={this.formSubmitted} noValidate>
                { FIELDS.map(({ name, title, ref, placeholder }) =>
                    <FormField fieldName={name} formError={formError}>
                        <FormLabel
                            title={title}
                            offset={false}
                            fieldName={name}
                            formError={formError}
                        />
                        <Input
                            ref={ref}
                            name="name"
                            className="full"
                            defaultValue={user ? user[name] : null}
                            placeholder={placeholder}
                            onChange={this.onChange}
                        />
                    </FormField>
                )}

                <FormField fieldName="email" formError={formError}>
                    <FormLabel
                        title={managed
                            ? "Sign in with Google Email address"
                            : "Email address"
                        }
                        offset={false}
                        fieldName="email"
                        formError={formError}
                    />
                    <Input
                        ref="email"
                        name="email"
                        className="full"
                        defaultValue={user ? user.email : null}
                        placeholder="youlooknicetoday@email.com"
                        required
                        onChange={this.onChange}
                        disabled={managed}
                    />
                </FormField>

                <button className={cx("Button", {"Button--primary": valid})} disabled={!valid}>
                    Save
                </button>
                    <FormMessage formError={(updateUserResult && !updateUserResult.success) ? updateUserResult : undefined} formSuccess={(updateUserResult && updateUserResult.success) ? updateUserResult : undefined} />
            </form>
        );
    }
}
