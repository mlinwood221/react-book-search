// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config/linters/.stylelintrc.json');

config.plugins.push('stylelint-no-unsupported-browser-features');
config.rules = {
  ...config.rules,
  'plugin/no-unsupported-browser-features': [
    true,
    {
      severity: 'warning',
      ignore: ['multicolumn']
    }
  ]
};

module.exports = config;
