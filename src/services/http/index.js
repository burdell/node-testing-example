function send(payload) {
  console.log('=== HTTP ===', payload);

  return Promise.resolve(payload);
}

module.exports = {
  send
};
