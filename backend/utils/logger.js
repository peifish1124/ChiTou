const fs = require('fs');

exports.saveToLogFile = async (logFilePath, message) => {
  console.log(message);

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
  const logEntry = `${timestamp}\n${message}\n\n`;

  fs.appendFile(logFilePath, logEntry, err => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

exports.readLogFile = async (logFilePath) => {
  try {
    const logContent = fs.readFileSync(logFilePath, 'utf8');
    return logContent;
  } catch (err) {
    console.error('Error reading log file:', err);
    return 'Error reading log file.';
  }
}

exports.clearLogFile = async (logFilePath) => {
  try {
    fs.writeFileSync(logFilePath, '');
    console.log('Log file cleared.');
  } catch (err) {
    console.error('Error clearing log file:', err);
  }
}
