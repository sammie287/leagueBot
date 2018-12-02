const fs = require('fs')
const https = require('https')
const {usernames} = require('../config/config.json')
const auth = require('../config/auth.json')
const encoding = 'utf8'

if (!String.prototype.toProper) {
    Object.defineProperty(String.prototype, 'toProper', {
        value: function() {
            return this.charAt(0).toUpperCase() + this.substr(1)
        }
    })
}

module.exports = {
    getTime: function() {
        var timeStamp = (new Date()).toLocaleString('en-US')
        return timeStamp
    },
    httpsGetAsync: function(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                let statusCode = response.statusCode.toString()
                if(statusCode.charAt(0) != 2){
                    module.exports.botLog(`Status code ${statusCode} from API call.`)
                    reject(statusCode)
                    return undefined
                }
                let data = ''
                response.on('data', (chunk) => {
                    data += chunk
                })
                response.on('end', () => {
                    resolve(JSON.parse(data))
                })
            }).on('error', reject)
        })
    },
    unpackMap: function(map) {
        var mapValues = map.values()
        var list = []
        var isDone = false
        while(!isDone){
            var tmp = mapValues.next()
            if(tmp.value != undefined){
                list.push(tmp.value)
            }
            isDone = tmp.done
        }
        return list
    },
    botLog: function(msg) {
        var output = `${module.exports.getTime()}: ${msg}`
        console.log(output)
        output += '\n'
        const path = 'log.txt'
        try{
            if(!fs.existsSync(path)){
                fs.writeFileSync(path, '', encoding, (err) => {
                    if(err) throw err
                })
            }
            fs.appendFileSync(path, output, encoding, (err) => {
                if(err) throw err
            })
        }
        catch(e){
            console.log(`${module.exports.getTime()}: Error saving log file.\n${e}`)
        }
    },
    noName: function() {
        return(`You have not set a username. Set one like this: !summoner ${usernames[Math.floor(Math.random() * usernames.length)]}`)
    }
}