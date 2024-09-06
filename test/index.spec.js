import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import assert from 'assert';
import axeDevtools from '@axe-devtools/browser';
import Reporter from '@axe-devtools/reporter';
import rimraf from 'rimraf';
import fs from 'fs';

const App = () => (
  <div>
    <h2> This is an example test in jest-RTL </h2>
    <h1>Hello World</h1>
    <img src="image.jpg" /> 
    <button value="submit"> Submit</button>
  </div>
);

describe('@axe-devtools/browser, jest, @testing-library/react', () => {
  let reporter;

  beforeEach(() => {
    rimraf.sync('./a11y-results*');
    reporter = new Reporter('A11yResults', './a11y-results');
    // Ensure the directory is created
    if (!fs.existsSync('./a11y-results')) {
      fs.mkdirSync('./a11y-results');
    }
  });

  afterEach(async () => {
    await reporter.buildHTML('./a11y-results');
    await reporter.buildCSV('./a11y-results');
    await reporter.buildJUnitXML('./a11y-results');
    cleanup();
  });

  it('should test @testing-library/react component', async () => {
    let container;
    await act(async () => {
      container = render(<App />).container;
    });
    const results = await axeDevtools.run(container);
    reporter.logTestResult('rtl-component', results);
    console.log(results)

    assert.equal(results.violations.length, 0);
  });
});