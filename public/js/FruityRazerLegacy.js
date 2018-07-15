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

const axios = require('axios');

const BaseURL = 'http://localhost:24577';

function getDeviceList(cb) {
    axios.get(BaseURL + '/devices').then(response => {
        if (response.data.devices)
            return cb(response.data.devices);
        
        return cb(null);
    }).catch(e => cb(null));
}

function sendLightingMessage(device, args, cb) {
    axios.post(BaseURL + '/devices/' + device + '/lighting', args).then(response => {
        if (response.data.success)
            return cb(true);
        
        return cb(false);
    }).catch(e => cb(false));
}

module.exports = { getDeviceList, sendLightingMessage };