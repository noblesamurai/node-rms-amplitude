const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tempy = require('tempy');

module.exports = async function sox (filename) {
  const tempfile = tempy.file({ extension: 'wav' });
  await exec(`ffmpeg -i ${filename} ${tempfile}`);
  const { stderr } = await exec(`sox ${tempfile} -n stat`);
  const parsed = stderr.match(/RMS[ ]+amplitude:[ ]+([\d.]+)/);
  return parsed && parseFloat(parsed[1]);
};
