function send(payload) {
  console.log('=== QUEUE ===', payload);

  return Promise.resolve(payload);
}

module.exports = {
  send
};
