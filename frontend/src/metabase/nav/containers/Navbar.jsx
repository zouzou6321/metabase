import React, { Component } from 'react';
import PropTypes from "prop-types";
import cx from "classnames";

import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router";

import Icon from "metabase/components/Icon.jsx";
import LogoIcon from "metabase/components/LogoIcon.jsx";
import * as Urls from "metabase/lib/urls";

import ProfileLink from "metabase/nav/components/ProfileLink.jsx";

import { getPath, getContext, getUser } from "../selectors";

const mapStateToProps = (state, props) => ({
    path:       getPath(state, props),
    context:    getContext(state, props),
    user:       getUser(state)
});

const mapDispatchToProps = {
    onChangeLocation: push
};

const BUTTON_PADDING_STYLES = {
    newQuestion: {
        paddingLeft: "1.0rem",
        paddingRight: "1.0rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
    }
};

const AdminNavItem = ({ name, path, currentPath }) =>
    <li>
        <Link
            to={path}
            data-metabase-event={`NavBar;${name}`}
            className={cx("NavItem py1 px2 no-decoration", {"is--selected": currentPath.startsWith(path) })}
        >
            {name}
        </Link>
    </li>

const MainNavLink = ({ to, name, eventName }) =>
    <Link
        to={to}
        className="NavItem block text-white p2 py3 no-decoration text-bold"
        data-metabase-event={`NavBar;${eventName}`}
        activeClassName={"NavItem--selected"}
    >
        {name}
    </Link>

@connect(mapStateToProps, mapDispatchToProps)
export default class Navbar extends Component {
    static propTypes = {
        className: PropTypes.string,
        context: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        user: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    isActive(path) {
        return this.props.path.startsWith(path);
    }

    renderAdminNav() {
        return (
            <nav className={cx("Nav AdminNav", this.props.className)}>
                <div className="wrapper flex align-center">
                    <div className="NavTitle flex align-center">
                        <Icon name={'gear'} className="AdminGear" size={22}></Icon>
                        <span className="NavItem-text ml1 hide sm-show text-bold">Metabase Admin Panel</span>
                    </div>

                    <ul className="sm-ml4 flex flex-full text-strong">
                        <AdminNavItem name="Settings"    path="/admin/settings"     currentPath={this.props.path} />
                        <AdminNavItem name="People"      path="/admin/people"       currentPath={this.props.path} />
                        <AdminNavItem name="Data Model"  path="/admin/datamodel"    currentPath={this.props.path} />
                        <AdminNavItem name="Databases"   path="/admin/databases"    currentPath={this.props.path} />
                        <AdminNavItem name="Permissions" path="/admin/permissions"  currentPath={this.props.path} />
                    </ul>

                    <ProfileLink {...this.props} />
                </div>
            </nav>
        );
    }

    renderEmptyNav() {
        return (
            <nav className={cx("Nav py2 sm-py1 xl-py3 relative", this.props.className)}>
                <ul className="wrapper flex align-center">
                    <li>
                        <Link to="/" data-metabase-event={"Navbar;Logo"} className="NavItem cursor-pointer flex align-center">
                            <LogoIcon className="text-brand my2"></LogoIcon>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }

    renderMainNav() {
        return (
            <nav className={cx("Nav relative bg-brand", this.props.className)}>
                <ol className="flex align-center">
                    <li className="absolute left bottom top flex align center flex-full justify-center p2">
                        <Link to="/" data-metabase-event={"Navbar;Logo"}>
                            <LogoIcon dark={true}></LogoIcon>
                        </Link>
                    </li>
                    <li className="wrapper">
                        <ol className="flex align-center">
                            <li>
                                <MainNavLink to="/dashboards" name="Dashboards" eventName="Dashboards" />
                            </li>
                            <li>
                                <MainNavLink to="/questions" name="Questions" eventName="Questions" />
                            </li>
                            <li>
                                <MainNavLink to="/pulse" name="Pulses" eventName="Pulses" />
                            </li>
                            <li>
                                <MainNavLink to="/reference/guide" name="Data Reference" eventName="DataReference" />
                            </li>
                            <li>
                                <Link to={Urls.question()} data-metabase-event={"Navbar;New Question"} style={BUTTON_PADDING_STYLES.newQuestion} className="NavNewQuestion rounded inline-block bg-white text-brand text-bold cursor-pointer px2 no-decoration transition-all">
                                    New <span>Question</span>
                                </Link>
                            </li>
                        </ol>
                    </li>
                    <li className="flex-align-right transition-background absolute top right">
                        <div className="inline-block text-white"><ProfileLink {...this.props}></ProfileLink></div>
                    </li>
                </ol>
            </nav>
        );
    }

    render() {
        let { context, user } = this.props;

        if (!user) return null;

        switch (context) {
            case "admin": return this.renderAdminNav();
            case "auth": return null;
            case "none": return this.renderEmptyNav();
            case "setup": return null;
            default: return this.renderMainNav();
        }
    }
}
