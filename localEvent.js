const user = process.env.SLACK_EVENT_USER
const channel = process.env.SLACK_EVENT_CHANNEL

module.exports = function() {
    return {
        event: {
            text: 'one more test',
            user,
            channel,
        },
    }
}
