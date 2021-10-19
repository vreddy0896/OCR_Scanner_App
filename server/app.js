const express = require('express');
const cors = require('cors');

const app = express();
const axios = require('axios');
const queryString = require('querystring')
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let file = null;
let resultData = [];
async function getOcrData(ocrData) {
  try{
    let res = await axios.post('https://app.nanonets.com/api/v2/OCR/Model/a613db31-dc2d-4cbe-b101-382221b610bf/LabelUrls/', queryString.stringify(ocrData),
    {
      headers: {
        'Authorization' : 'Basic ' + Buffer.from('Pl110l3xpS0GHA8zHu2Co4K6bKsaE0H1' + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if(res.status == 200){
      console.log(res.status)
    }  
  return res.data
  }
catch (err) {
console.error(err);
}
}

app.post('/backend', function(req, res) {
  let ocrData = {
    url: req.body.url,
  }

  //getOcrData(ocrData)
  axios.post('https://app.nanonets.com/api/v2/OCR/Model/a613db31-dc2d-4cbe-b101-382221b610bf/LabelUrls/', queryString.stringify(ocrData),
    {
      headers: {
        'Authorization' : 'Basic ' + Buffer.from('Pl110l3xpS0GHA8zHu2Co4K6bKsaE0H1' + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  .then((response) => {
    response.data.result.map((chunk)=> {
      chunk.prediction.map((data)=>{
          resultData.push({label:data.label, ocr_text: data.ocr_text});
      });
    });
    console.log(resultData);
    res.end(JSON.stringify(resultData));
  })
  .catch((err)=> {
    console.log(err);
  });
});

module.exports = app;