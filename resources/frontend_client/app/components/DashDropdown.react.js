'use strict';

import React, { Component } from 'react';

import Icon from './Icon.react';

export default class DashDropdown extends Component {
    constructor() {
        super();
        this.state = { dropdownOpen: false }
        this.toggleDropdown = this.toggleDropdown.bind(this)
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { dashboards } = this.props;
        return (
            <div className="NavDropdown ml1 md-ml3">
                <a className="NavDropdown-button NavItem text-white cursor-pointer p2 flex align-center" onClick={this.toggleDropdown}>
                    <span className="NavDropdown-button-layer">
                        Dashboards
                        <Icon name="chevrondown" width={8} height={8} />
                    </span>
                </a>
                { this.state.dropdownOpen ? (
                    <div className="NavDropdown-content DashboardList">
                    { dashboards.length > 0 ?
                        (
                        <ul className="NavDropdown-content-layer">
                        { dashboards.map((dashboard, index) => {
                            return (
                                <li className="block" key={index}>
                                    <a className="Dropdown-item block text-white no-decoration" href="/dash/{{dash.id}}">
                                        <div className="flex text-bold">
                                            {dashboard.name}
                                        </div>
                                        <div className="mt1 text-light text-brand-light">
                                            {dashboard.description}
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                        <li className="block border-top border-light">
                            <a className="Dropdown-item block text-white no-decoration" href="#" mb-dashboard-create>Create a new dashboard</a>
                        </li>
                    </ul>

                        )
                    :
                        (
                            <div className="NavDropdown-content-layer text-white text-centered">
                                <div className="p2"><span className="QuestionCircle">?</span></div>
                            <div className="px2 py1 text-bold">You don’t have any dashboards yet.</div>
                            <div className="px2 pb2 text-light">Dashboards group visualizations for frequent questions in a single handy place.</div>
                            <div className="border-top border-light">
                            <a className="Dropdown-item block text-white no-decoration" href="#" mb-dashboard-create>Create a new dashboard</a>
                            </div>
                            </div>
                        )
                    }
                    </div>
                ) : null }
            </div>
        )
    }
}
