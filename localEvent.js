const user = process.env.SLACK_EVENT_USER
const channel = process.env.SLACK_EVENT_CHANNEL

const text = 'TEST FROM LOCAL'

module.exports = function() {
    return {
        event: {
            text,
            user,
            channel,
        },
    }
}
