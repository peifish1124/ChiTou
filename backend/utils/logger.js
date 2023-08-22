const fs = require('fs');
const path = require('path');

exports.saveToLogFile = async (message) => {
  // console.log(message);
  // get date and time
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // log file
  const logFileName = `log-${year}-${month}-${day}.txt`;
  const logFilePath = path.join(__dirname, '../logs', logFileName);

  const timestamp = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
  const logEntry = `\n${timestamp}\n${message}\n`;

  fs.writeFile(logFilePath, logEntry,{ flag: 'a' }, err => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

exports.readLogFile = async () => {
  try {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    // log file
    const logFileName = `log-${year}-${month}-${day}.txt`;
    const logFilePath = path.join(__dirname, '../logs', logFileName);

    const logContent = fs.readFileSync(logFilePath, 'utf8');
    return logContent;
  } catch (err) {
    console.error('Error reading log file:', err);
    return 'Error reading log file.';
  }
}

exports.clearLogFile = async () => {
  try {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    // log file
    const logFileName = `log-${year}-${month}-${day}.txt`;
    const logFilePath = path.join(__dirname, '../logs', logFileName);

    fs.writeFileSync(logFilePath, '');
    console.log('Log file cleared.');
  } catch (err) {
    console.error('Error clearing log file:', err);
  }
}
