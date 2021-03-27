module.exports = {
    name: 'epy',
    description: 'Execute python code',
    execute(message, args, Extra) {
        try {
			let Channel = message.channel
			let Embed = Extra["Embed"]
            let Prefix = Extra["Prefix"]
            let Sandbox = Extra["Pyexec"]
            const poolSize = 5
            let mySandbox = new Sandbox({poolSize})

            mySandbox.initialize(err => {
            if (err) throw new Error(`unable to initialize the sandbox: ${err}`)
            
            const code = message.content.slice(Prefix.length)
            const timeoutMs = 2 * 1000
            
            mySandbox.run({code, timeoutMs}, (err, result) => {
                if (err) throw new Error(`unable to run the code in the sandbox: ${err}`)
                
                let x = result.stdout // Hello, world!
                let ToSend = `${x}`
                Embed.setDescription(ToSend)
                Channel.send(Embed)
            })
            })
			
		} catch (error) {
			console.log(error)
		}
    }
}