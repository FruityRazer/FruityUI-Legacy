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

import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';

import Blank from './Screens/Blank';
import Default from './Screens/Default';
import NotSupported from './Screens/NotSupported';
import Synapse2 from './Screens/Synapse2';
import Synapse3 from './Screens/Synapse3';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { device: null };
    }

    render() {
        let detail = <NotSupported />;

        if (this.props.device) {
            const { shortName } = this.props.device;

            switch (shortName) {
                case 'firefly':
                case 'mamba':
                case 'huntsman_elite_hw':
                    detail = <Synapse2 device={shortName} />;
                    
                    break;

                case 'base_station':
                case 'huntsman_elite_sw':
                case 'hyperflux':
                    detail = <Synapse3 device={shortName} />;

                    break;

                default:
                    break;
            }
        } else {
            detail = <Default />;
        }

        //  Workaround to force the sub-view to reload when changed.

        if (this.props.device && this.state.device !== this.props.device.shortName) {
            this.setState({ device: this.props.device.shortName });

            detail = <Blank />;
        }

        return (
            <div className="window">
                <div className="window-content">
                    <div className="pane-group">
                        <div className="pane-sm sidebar">
                            <Sidebar />
                        </div>
                        <div className="pane">
                            { detail }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const getDevice = navigation => navigation.device;

const mapStateToProps = state => {
    return {
        device: getDevice(state.navigation)
    };
};

export default connect(mapStateToProps, null)(App);
