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

import { ToastContainer, toast } from 'react-toastify';

import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

import FruityRazer from '../../FruityRazer';
import Storage from '../../Storage';

import 'react-toastify/dist/ReactToastify.css';

export default class Generic extends Component {
    constructor(props) {
        super(props);

        this.onRawChange = this.onRawChange.bind(this);
        this.onSave = this.onSave.bind(this);

        this.state = {
            raw: ''
        };
    }

    componentDidMount() {
        Storage.getDeviceSettings(this.props.device, savedSettings => {
            if (savedSettings)
                this.setState({ ...savedSettings })
        });
    }

    onRawChange(raw) {
        this.setState({ raw });
    }

    async onSave(ev) {
        ev.preventDefault();

        const success = await FruityRazer.sendLightingMessage(this.props.device, JSON.parse(this.state.raw));
        
        if (success) {
            Storage.storeDeviceSettings(this.props.device, this.state);

            toast.success('💡 Successfully changed the device\'s lighting settings!', { position: toast.POSITION.BOTTOM_RIGHT });
        } else
            toast.error('❌ An error has occurred.', { position: toast.POSITION.BOTTOM_RIGHT });
    }

    render() {
        return (
            <div className="padded-more">
                <form>
                    <div className="form-group">
                        <label>Raw Data</label>
                        <AceEditor
                            mode='json'
                            theme='github'
                            value={this.state.raw}
                            onChange={this.onRawChange}
                            name='raw'
                            style={{ height: 200 }}
                        />
                    </div>

                    <hr />

                    <button className="btn btn-large btn-default" onClick={this.onSave}>Save</button>
                </form>

                <ToastContainer />
            </div>
        );
    }
}
