import moment from 'moment'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
import users from './dataSource'

import { getData } from '../api/service'
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function mockData(query, type, string_date) {
    console.log("date",string_date)
    query = purify(query)
    const { limit = 10, offset = 0, sort = '', order = '' } = query

    return new Promise(function (resolve, reject) {
        var fetchData = new getData();

        switch (type) {
            case 'radios':
                fetchData.getradios(string_date,get_callback);
                break;
            case 'regions':
                fetchData.getregions(string_date,get_callback);
                break;
            case 'streams':
                fetchData.getstreams(string_date,get_callback);
                break;
            default:
                break;
        }

        function get_callback(json) {
            var rows = json
            if (sort) {
                rows = orderBy(rows, sort, order)
            }

            const res = {
                rows: rows.slice(offset, offset + limit),
                total: rows.length
            }
            const consoleGroupName = 'Mock data - ' + moment().format('YYYY-MM-DD HH:mm:ss')
            setTimeout(() => {
                console.group(consoleGroupName)
                console.info('Receive:', query)
                console.info('Respond:', res)
                console.groupEnd(consoleGroupName)
            }, 0)
            resolve(purify(res))
        }
    })



}
