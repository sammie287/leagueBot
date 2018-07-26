const fs = require('fs')
const common = require('../src/common.js')

module.exports = {
    name:'win',
    async execute(message, args) {
        try{
            var index = await Math.floor(Math.random() * 30) + 1
            await message.channel.send({
                files: [{
                    attachment: `./catpics/photo${index}.png`,
                    name: 'temp.png'
                }]
            })
            await message.channel.send('Congrats on your win!')
        }
        catch(e){
            await console.log(`${common.getTime()}: ${e}`)
            await message.channel.send('Something seems to have gone wrong, see the log for info.')
            
        }
    }
    // async execute(message, args) {
    //     try {
    //         await this.botBrowser.navigate(searchLink)
    //         await this.botBrowser.clickSelector(imageButtonSel)

    //         //Select a random image on the image search page
    //         var index = await Math.floor(Math.random() * (31 - 1) + 1)
    //         var selector = `div.rg_bx:nth-child(${index}) > a:nth-child(1) > img:nth-child(2)`
    //         await this.botBrowser.wait(1500)
            
    //         await this.botBrowser.screenshot(selector)
    
    //         await message.channel.send({
    //             files: [{
    //                 attachment: './images/tmp.png',
    //                 name: 'tmp.png'
    //             }]
    //         })
    //         await message.channel.send(`Congrats on your win!`)
    //     }
    //     catch(e){
    //         await message.channel.send(`The internet isn't playing nice with me, please try again.`)
    //         await console.log(e)
    //     }
    // }
}