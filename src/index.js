const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function sox (filename) {
  const { stderr } = await exec(`sox ${filename} -n stat`);
  const parsed = stderr.match(/RMS[ ]+amplitude:[ ]+([\d.]+)/);
  return parsed && parseFloat(parsed[1]);
};
