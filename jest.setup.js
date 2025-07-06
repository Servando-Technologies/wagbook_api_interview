const { server } = require(process.env.USE_FILE ? './' + process.env.USE_FILE.replace('.js', '') : './index');

beforeAll(async () => {
  await new Promise((resolve) => server.listen(0, resolve));
});

afterAll((done) => {
  server.close(done);
});