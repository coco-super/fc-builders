'use strict';

const TaskFlow = require('../../taskflow');

const CopySourceTask = require('../../copy-source-task');
const mkdirp = require('mkdirp-promise');
const PipInstallTask = require('./pip-install-task');

class PipTaskFlow extends TaskFlow {

  constructor(serviceName, functionName, sourceDir, artifactDir) {
    super('PipTaskFlow', serviceName, functionName, sourceDir, artifactDir);
  }

  async init() {

    // make sure artifactDir exist
    await mkdirp(this.artifactDir);
        
    this.tasks.push(new PipInstallTask(this.sourceDir, this.artifactDir));
    this.tasks.push(new CopySourceTask(this.sourceDir, this.artifactDir)); // todo: exclude
  }
}

module.exports = PipTaskFlow;