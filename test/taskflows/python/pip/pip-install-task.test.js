'use strict';

const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const assert = sinon.assert;

const fs = require('fs-extra');
const path = require('path');

const PipInstallTask = require('../../../../lib/taskflows/python/pip/pip-install-task');
const cmd = require('../../../../lib/utils/command');

describe('test PipInstallTask', () => {
  const sourceDir = '/code';
  const artifactDir = '/artifactDir';

  beforeEach(async () => {
    sandbox.stub(cmd, 'execCommand').resolves({});
    sandbox.stub(fs, 'pathExists').resolves(true);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('test PipInstallTask', async () => {

    const pipInstallTask = new PipInstallTask(sourceDir, artifactDir);

    await pipInstallTask.run();

    assert.calledWith(fs.pathExists, path.join(sourceDir, 'requirements.txt'));
    assert.calledWith(cmd.execCommand, 'pip', ['install', '--disable-pip-version-check', '-t', artifactDir, '-r', path.join(sourceDir, '/requirements.txt')]);
  });
});
