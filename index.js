const record = require('node-record-lpcm16');
const {Detector, Models} = require('snowboy');

const models = new Models();

models.add({
  file: '/Users/vijay.jandhyala/personal_repo/Alie-client/node_modules/snowboy/resources/snowboy.umdl',
  sensitivity: '0.5',
  hotwords : 'snowboy'
});

const detector = new Detector({
  resource: "/Users/vijay.jandhyala/personal_repo/Alie-client/node_modules/snowboy/resources/common.res",
  models: models,
  audioGain: 2.0
});

detector.on('silence', function () {
  console.log('silence');
});

detector.on('sound', function () {
  console.log('sound');
});

detector.on('error', function () {
  console.log('error');
});

detector.on('hotword', function (index, hotword) {
  console.log('hotword', index, hotword);
});

const mic = record.start({
  threshold: 0,
  verbose: true
});

mic.pipe(detector);
