describe('User Service', () => {
  let updateVehicle;
  let mockHttp;
  let mockVehicle;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    mockHttp = jest.fn().mockResolvedValue({});
    jest.doMock('../services/http', () => ({ send: mockHttp }));

    mockVehicle = {
      vehicleId: '1234',
      year: 2020,
      make: 'Volkswagen',
      model: 'Passat'
    };

    updateVehicle = require('.');
  });

  it('updates a vehicle', async () => {
    await updateVehicle(mockVehicle);

    const mockRequest = mockHttp.mock.calls[0][0];
    expect(mockRequest.verb).toEqual('PUT');
    expect(mockRequest.url).toEqual(
      `http://localhost:3000/vehicle/${mockVehicle.vehicleId}`
    );
    expect(mockRequest.body).toEqual({
      year: mockVehicle.year,
      make: mockVehicle.make,
      model: mockVehicle.model
    });
  });
});
