export default class Logger {
  constructor(options) {
    const defaultOptions = {
      loggerInterface: console,
    };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  log(message) {
    this.options.loggerInterface.log(message);
  }
}
