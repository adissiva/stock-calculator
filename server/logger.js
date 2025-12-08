import chalk from 'chalk';
import ip from 'ip';

const divider = chalk.gray('\n-----------------------------------\n');

const logger = {
  error: (msg) => {
    console.error(chalk.red(msg));
  },
  info: (msg) => {
    console.log(chalk.blue(msg));
  },
  appStarted: (port, host, contextPath, tunnelStarted) => {
    console.log(chalk.green('App is running at:'));
    if (tunnelStarted) {
      console.log('Tunnel Initialized: ', chalk.green('+' + tunnelStarted));
    }
    console.log(` ${chalk.bold('Stock-Calculator URLs:')}`);
  },
};

export default logger;
