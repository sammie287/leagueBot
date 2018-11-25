const common = require('../src/common')
const getTime = common.getTime

module.exports = {
    name:'summoner',
    async execute(message, args) {
        try {
            if(!args.length) {
                var name = await this.botDatabase.getName(message)
                if(name == null){
                    message.channel.send(`You have not set a username. Set one like this: !summoner T33m0iskool`)
                    return
                }
                else{
                    message.channel.send(`Your name is set to '${name}'.`)
                    //Debug - common.botLog(`SUMMONERNAME: ${accountInfo.summonerName}\nPROFILEICONID: ${accountInfo.profileIconId}\nACCOUNTID: ${accountInfo.accountId}\nID: ${accountInfo.id}`)
                }
            }
            else{
                var name = args[0]
                //var truncatedInput = args[1].substring(0, 500)
                await this.botDatabase.setName(message, name, this.leagueAPI)
                message.channel.send(`I've set your summoner name to be '${name}'.`)
            }
        }
        catch(e) {
            common.botLog(`${e}`)
            message.channel.send(`Something wrong seems to have happened, check the log.`)
        }
    }
}
