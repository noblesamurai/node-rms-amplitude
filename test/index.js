const expect = require('chai').expect;
const path = require('path');
const rmsAmplitude = require('..');

describe('rms-amplitude', function () {
  it('gives the RMS amplitude of an audio file', async function () {
    const result = await rmsAmplitude(path.join(__dirname, 'fixtures/Allure10.mp3'));
    expect(result).to.be.a('number');
  });
});
