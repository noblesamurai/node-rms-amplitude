const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tempy = require('tempy');

/**
 * @param {string} filename
 * @param {object} opts
 * @param {string} opts.ffmpeg ffmpeg full path
 * @param {string} opts.sox sox full path
 */
module.exports = async function sox (filename, opts = {}) {
  const { ffmpeg = 'ffmpeg', sox = 'sox' } = opts;
  const tempfile = tempy.file({ extension: 'wav' });
  await exec(`${ffmpeg} -i ${filename} ${tempfile}`);
  const { stderr } = await exec(`${sox} ${tempfile} -n stat`);
  const rms = stderr.match(/RMS[ ]+amplitude:[ ]+([\d.]+)/);
  const max = stderr.match(/Maximum[ ]+amplitude:[ ]+([\d.]+)/);
  return rms && max && { rms: parseFloat(rms[1]), max: parseFloat(max[1]) };
};
