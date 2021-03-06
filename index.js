import EmberObject, { computed } from '@ember/object';
import { get } from '@ember/object';
import { A, isArray } from '@ember/array';
import Router from '@ember/routing/router';
import Route from '@ember/routing/route';
import { camelize, dasherize } from '@ember/string';
import Application from '@ember/application';
import EmberController from '@ember/controller';
import EmberService from '@ember/service';
import { run } from '@ember/runloop';
import { isEmpty, typeOf, isNone } from '@ember/utils';

window.EmberObject = EmberObject;
window.computed = computed;
window.get = get;
window.EmberArray = A;
window.isArray = isArray;
window.EmberRouter = Router;
window.EmberRoute = Route;
window.camelize = camelize;
window.dasherize = dasherize;
window.Application = Application;
window.EmberController = EmberController;
window.EmberService = EmberService;
window.run = run;
window.isEmpty = isEmpty;
window.typeOf = typeOf;
window.isNone = isNone;
