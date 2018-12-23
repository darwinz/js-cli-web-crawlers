const phantom = require('phantom');
const config = require('config');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(config.get('solar.loginUrl'));
  const content = await page.property('content');
  console.log(content);

  await instance.exit();
})();
