global.fetch = jest.fn().mockImplementation((url, options) => {
    const response = {
      ok: true,
      json: async () => ({}),
    };
    return Promise.resolve(response);
  });