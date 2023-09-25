export default (clientId, channel) => !channel.members.get(clientId) ? false : true;
