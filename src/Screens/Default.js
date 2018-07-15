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

export default class Default extends Component {
    render() {
        return (
            <div className="padded-more">
                <center><h2>Welcome to <b>FruityUI</b>!</h2></center>
                <hr />
                <center><p>Please select a device!</p></center>
            </div>
        );
    }
}
