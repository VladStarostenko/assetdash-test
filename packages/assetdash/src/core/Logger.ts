export class Logger {
  logStatus(message: string) {
    if (this.isTest()) {
      return;
    }
    console.log(message);
  }

  logError(message: string) {
    if (this.isTest()) {
      return;
    }
    console.error(message);
  }

  private isTest() {
    return process.env.NODE_ENV === 'test';
  }
}
