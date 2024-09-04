require('dotenv').config();
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const util = require('util');
const rimrafAsync = util.promisify(rimraf);
const reportsDash_json_path = './a11y-results';

module.exports = {
  pushJsonToAxeReports: async function(results) {
    let api_test_key = process.env.AXE_REPORTER_API_KEY;
    if (!api_test_key) {
      throw new Error('AXE_REPORTER_API_KEY is not defined');
    }
    let dimensions = "ProductA,App,MainComponent";
    console.log(dimensions);
    exec(`axe bulk-reports ${reportsDash_json_path} --axe-reports-api-key ${api_test_key} --send-axe-reports --axe-reports-dimensions=${dimensions}`, function(err, stdout, stderr) {
      if (err) {
        throw err;
      }
      console.log(stdout);
      console.log("CLI binary execution completed");
    });
    console.log("Uploaded Reports to Axe Reports Dashboard");
  },
  
  deleteTempaxeDashReportsDir: async function() {
    await rimrafAsync(reportsDash_json_path);
    console.log(`DELETED ${reportsDash_json_path}/`);
  }
};