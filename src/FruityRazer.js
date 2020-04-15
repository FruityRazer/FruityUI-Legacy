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

import axios from 'axios';

class FruityRazer {

    static BaseURL = 'http://localhost:24577';

    key = null;

    constructor() {
        this.setup()
            .then()
            .catch();
    }

    get customHeaders() {
        if (!this.key)
            return {};
        
        return { 
            headers: {
                'X-FruityRazer-Key': this.key
            }
        };
    }

    async setup() {
        try {
            const response = await axios.get(FruityRazer.BaseURL + '/key', this.customHeaders);

            if (response.data.key)
                this.key = response.data.key;
        } catch (e) {

        }
    }

    async getDeviceList() {
        try {
            const response = await axios.get(FruityRazer.BaseURL + '/devices', this.customHeaders);

            if (response.data.devices)
                return response.data.devices;
        } catch (e) {

        }

        return null;
    }

    async sendLightingMessage(device, args) {
        try {
            const response = await axios.post(FruityRazer.BaseURL + '/devices/' + device + '/lighting', args, this.customHeaders);

            if (response.data.success)
                return true;
        } catch (e) {

        }
        
        return false;
    }

}

export default FruityRazer();