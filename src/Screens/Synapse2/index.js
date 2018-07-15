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
import { SketchPicker } from 'react-color';

import FruityRazer from '../../FruityRazer';
import Storage from '../../Storage';

import 'react-toastify/dist/ReactToastify.css';

export default class Generic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'wave',
            color: '#000000'
        };
        
        this.onColorChange = this.onColorChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);

        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        Storage.getDeviceSettings(this.props.device, savedSettings => {
            if (savedSettings)
                this.setState({ ...savedSettings })
        });
    }

    onColorChange(color) {
        this.setState({ color: color.hex });
    }

    onTypeChange(ev) {
        this.setState({ type: ev.target.value });
    }

    async onSave(ev) {
        ev.preventDefault();

        const success = await FruityRazer.sendLightingMessage(this.props.device, {
            type: this.state.type,
            color: this.state.color
        });
        
        if (success) {
            Storage.storeDeviceSettings(this.props.device, this.state);

            toast.success('💡 Successfully changed the device\'s lighting settings!', { position: toast.POSITION.BOTTOM_RIGHT });
        } else
            toast.error('❌ An error has occurred.', { position: toast.POSITION.BOTTOM_RIGHT });
    }

    render() {
        const showColorPicker = this.state.type && (this.state.type === 'static' || this.state.type === 'reactive' || this.state.type === 'breath');

        return (
            <div className="padded-more">
                <form>
                    <div className="form-group">
                        <label>Effect</label>
                        <select className="form-control" onChange={this.onTypeChange} value={this.state.type}>
                            <option value="wave">Wave</option>
                            <option value="spectrum">Spectrum</option>
                            <option value="static">Static</option>
                            <option value="reactive">Reactive</option>
                            <option value="breath">Breath</option>
                        </select>
                    </div>

                    { showColorPicker && (
                        <div className="form-group">
                            <br />
                            <label>Color</label>
                            <SketchPicker color={this.state.color} onChange={this.onColorChange} />
                        </div>
                    ) }

                    <hr />

                    <button className="btn btn-large btn-default" onClick={this.onSave}>Save</button>
                </form>

                <ToastContainer />
            </div>
        );
    }
}
