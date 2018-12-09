// import EmberObject from '@ember/object';
import { camelize, dasherize } from '@ember/string';
// import Application from '@ember/application';
import EmberController from '@ember/controller';
import EmberService from '@ember/service';
import { run } from '@ember/runloop';

// window.EmberObject = EmberObject;
window.camelize = camelize;
window.dasherize = dasherize;
// window.Application = Application;
window.EmberController = EmberController;
window.EmberService = EmberService;
window.run = run;
