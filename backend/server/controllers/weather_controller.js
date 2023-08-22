const errorRes = require('../../utils/error_message_util');
const axios = require('axios');

exports.getWeather = async (req, res) => {
  console.log('Get Weather');

  const { date, location_name } = req.query;
  if(typeof date == 'undefined' || typeof location_name == 'undefined') return res.status(200).json({data: {weather: {}}});

  try {
    const weatherApiUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${process.env.API_KEY}&format=JSON&locationName=${location_name}&elementName=WeatherDescription`;
    const response = await axios.get(weatherApiUrl);
    const weatherData = response.data.records.locations[0].location[0].weatherElement[0].time;
  
    const transformedData = [];
    const processedStartTimes = new Set();
    weatherData.forEach(item => {
      const startTime = item.startTime.split(' ')[0];
      const value = item.elementValue[0].value;
      if (!processedStartTimes.has(startTime)) {
        transformedData.push({
          startTime: startTime,
          value: value
        });
        processedStartTimes.add(startTime);
      }
    });
    
    const result = transformedData.find(item => item.startTime === date);
    console.log('Get Weather Success');
    if (result) {
      const split_result = result.value.split('。');
      res.status(200).json({
        data: {
          weather: {
            summary: split_result[0],
            PoP: split_result.length == 7 ? split_result[1] : '',
            temperature: split_result.length == 7 ? split_result[2] : split_result[1],
            feeling: split_result.length == 7 ? split_result[3] : split_result[2],
            wind: split_result.length == 7 ? split_result[4] : split_result[3],
            humidity: split_result.length == 7 ? split_result[5] : split_result[4]
          }
        }
      });
    } else {
      res.status(200).json({
        data: {
          weather: {}
        }
      });
    }
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.weatherConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
  

};