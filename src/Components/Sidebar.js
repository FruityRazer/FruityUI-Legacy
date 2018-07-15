/* 
 *  FruityUI - An UI for FruityRazer
 *  Copyright (C) 2018 Eduardo Almeida
 * 
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 * 
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setDevice } from '../Actions/NavigationActions';

import FruityRazer from '../FruityRazer';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.deviceClicked = this.deviceClicked.bind(this);

        this.state = {
            devices: [],
            selectedDevice: null
        };
    }

    async componentDidMount() {
        const devices = (await FruityRazer.getDeviceList()).filter(d => d.connected);

        this.setState({ devices });
    }

    deviceClicked(device) {
        this.setState({ selectedDevice: device });

        this.props.setDevice(device);
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    { this.state.devices.map(d => {
                        const className = 'list-group-item' + (this.state.selectedDevice === d ? ' active' : '');

                        return (
                            <li key={d.shortName} className={className} onClick={() => this.deviceClicked(d)}> { /* active */ }
                                <img className="img-circle media-object pull-left" src="http://via.placeholder.com/32x32" width="32" height="32" alt="Device" />
                                <div className="media-body">
                                    <strong>{d.fullName}</strong>
                                    <p style={{ color: 'green', fontWeight: 'bold' }}>Connected</p>
                                </div>
                            </li>
                        );
                    }) }
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = { setDevice };

export default connect(null, mapDispatchToProps)(Sidebar);