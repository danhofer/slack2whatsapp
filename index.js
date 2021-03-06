const request = require('request')

const slackToken = process.env.SLACK_TOKEN
const wassengerToken = process.env.WASSENGER_TOKEN
const chatGroup = process.env.WHATSAPP_GROUP

exports.handler = async event => {
    console.log(`Incoming event: ${JSON.stringify(event)}`)

    // /* -- Slack event challege only needed once when setting up -- */
    // /* -- Uncomment to validate API Gateway URL with Slack  -- */
    // let response
    // if(event.type === 'url_verification')
    //     response = {
    //         challenge: event.challenge
    //     }

    // else
    //     response = {
    //         statusCode: 200,
    //         body: JSON.stringify('Hello from Lambda!'),
    //     }
    // return response

    let user
    let channel
    let response

    function getUsername(event) {
        const promise = new Promise(resolve => {
            const options = {
                method: 'GET',
                url: 'https://slack.com/api/users.info',
                qs: {
                    token: slackToken,
                    user: event.event.user,
                },
            }

            request(options, function(error, response, body) {
                if (error) throw new Error(error)

                const data = JSON.parse(body)
                user = data.user.name
                resolve()
            })
        })

        return promise
    }

    function getChannel(event) {
        const promise = new Promise(resolve => {
            const options = {
                method: 'GET',
                url: 'https://slack.com/api/conversations.info',
                qs: {
                    token: slackToken,
                    channel: event.event.channel,
                },
            }

            request(options, function(error, response, body) {
                if (error) throw new Error(error)

                const data = JSON.parse(body)
                channel = data.channel.name
                resolve()
            })
        })

        return promise
    }

    function sendMessage(message) {
        const promise = new Promise(resolve => {
            const options = {
                method: 'POST',
                url: 'https://api.wassenger.com/v1/messages',
                headers: {
                    token: wassengerToken,
                    'content-type': 'application/json',
                },
                body: {
                    group: chatGroup,
                    message,
                },
                json: true,
            }

            request(options, function(error, response, body) {
                if (error) throw new Error(error)

                console.log(JSON.stringify(body))
                resolve()
            })
        })
        return promise
    }

    await getUsername(event)
    await getChannel(event)

    response = `_#${channel}_ *@${user}*: ${event.event.text}`

    // wassenger won't send messages properly with these characters
    const unreadables = /[<>]/g
    response = response.replace(unreadables, '')

    console.log(response)
    await sendMessage(response)
}
