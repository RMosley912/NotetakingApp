const filesystem = require('fs');
const utility = require('util');
const fetchFromFile = utility.promisify(filesystem.readFile);

const saveToFile = (target, content) =>
  filesystem.writeFile(target, JSON.stringify(content, null, 4), (error) =>
    error ? console.error(error) : console.info(`\nSaved data to ${target}`)
  );

const fetchAndAppend = (content, filePath) => {
  filesystem.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      saveToFile(filePath, parsedData);
    }
  });
};

module.exports = { fetchFromFile, saveToFile, fetchAndAppend };
