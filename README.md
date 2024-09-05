# axe DevTools Jest and React Testing Library with axe Reports in Jenkins

<p align="center">  
  <img src="https://www.deque.com/wp-content/uploads/2020/04/axe-devtools.svg" height="70px" width="100px" alt="" />
</p>

## Prerequisites

- npm
- NodeJS (6.10 or higher)

## Installation information

In order to use this sample project, you will need to clone the repository from GitHub. Once you've done that, in your terminal, navigate from the project root back to this example.

```
cd axe-reports-jenkins
```

Next, you'll need to install the dependencies for this project including axe DevTools CLI, axe DevTools Browser and the DevTools Reporter. They are already listed in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/browser/install-agora.html) on the Deque documentation site. Once your access to Deque's private registry has been configured, dependencies for this project can be installed as normal through yarn or npm.

```
npm install
```

## Running the test cases

Use this command to run the example

```
npm test
```

## Project Setup

The sample test file is held within the `test` directory. This file contains an example of how to set up the axe DevTools Browser and Reporter APIs, test for accessibility, and generate formatted results.

Once the sample project has been run, formatted results can be found in the `a11y-results` folder. The folder will contain the raw JSON results as well as the html, csv, and xml report formats. There will be one additional `html` file which is an executive summary report aggregating results from all scans into one page.

## Modifying this project

Behind the scenes, `npm test` runs this command defined in `package.json`

```json
  "scripts": {
    "pretest": "rimraf ./a11y-results",
    "test": "jest"
  },
```

The `rimraf` command will clear any saved results, so if you want to store previous runs you should remove this part of the run command. If you modify this project and want to publish your results in a different folder other than `./ally-results` then you should update the `dir` here as well.

## Sending Results to axe Reports

After running the tests, you can send the results to axe Reports using the following command:

```sh
npm run axe -- bulk-reports <results-directory> --axe-reports-api-key <your-axe-reports-api-key> --send-axe-reports --axe-reports-dimensions='<comma-separated-dimensions>'
```

You need an API key to push results to axe Reports:

- [Obtaining an API Key](https://docs.deque.com/devtools-for-web/4/en/cli-api-key-reports)

Ensure that axe Reports is configured with the necessary dimensions to receive data:

- [Configuring Scripts and Dimensions](https://docs.deque.com/reports/1.12/en/devtools-howtos)
- [First Time Data Setup](https://docs.deque.com/reports/1.12/en/configure-scripts#configure-scripts---first-time-data-setup)

The `result-name` in `reporter = new Reporter(<result-name>, <output-directory>)` becomes your axe DevTools script ID in axe Reports. This unique identifier allows you to push new data to specified dimensions.

## Jenkins Integration

This project is integrated with Jenkins to automate the execution of accessibility tests and push the results to axe Reports. The Jenkins pipeline performs the following steps:

1. Install Dependencies
2. Run Tests
3. Push Results to axe Reports

By integrating these steps into your CI/CD pipeline, you can monitor how UI changes impact accessibility and ensure that your product remains accessible over time. This process provides visibility into how accessibility is changing with each build or deployment, allowing you to better understand the accessibility health of your product.

The Jenkinsfile used for this integration is located in the `jenkins` directory.

## Additional Documentation

- [Overview](https://axe-devtools-html-docs.deque.com/reference/node/browser/overview.html)
- [API](https://axe-devtools-html-docs.deque.com/reference/node/browser/ref-overview.html)
- [Rules](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
