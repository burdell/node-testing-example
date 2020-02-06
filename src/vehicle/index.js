const httpService = require('../services/http');
const PutRequest = require('../services/http/put');

async function updateVehicle(payload) {
  const { vehicleId, ...body } = payload;
  const req = new PutRequest(`vehicle/${vehicleId}`, body);

  try {
    await httpService.send(req);
  } catch (e) {
    console.log('ya DONE');
  }
}

module.exports = updateVehicle;
