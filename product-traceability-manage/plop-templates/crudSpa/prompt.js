const { notEmpty } = require('../utils.js');

module.exports = {
  description: 'generate a crud spa',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'please input domain name',
    validate: notEmpty('name')
  }],
  actions: data => {
    const name = '{{name}}';
    const actions = [{
      type: 'add',
      path: `src/views/page/application/${name}/Index.vue`,
      templateFile: 'plop-templates/crudSpa/Index.hbs',
      data: {
        name: name,
        templateStart: '{{',
        templateEnd: '}}'
      }
    }, {
      type: 'add',
      path: `src/views/page/application/${name}/CreateOrUpdateModal.vue`,
      templateFile: 'plop-templates/crudSpa/CreateOrUpdateModal.hbs',
      data: {
        name: name,
        templateStart: '{{',
        templateEnd: '}}'
      }
    }, {
      type: 'add',
      path: `src/views/page/application/${name}/index.scss`,
      templateFile: 'plop-templates/crudSpa/index.scss',
      data: {
        name: name
      }
    }, {
      type: 'add',
      path: `src/apis/application/${name}.js`,
      templateFile: 'plop-templates/crudSpa/api.js',
      data: {
        name: name
      }
    }, {
      type: 'add',
      path: `src/router/routes/application/${name}.js`,
      templateFile: 'plop-templates/crudSpa/router.tlp',
      data: {
        name: name
      }
    }];
    return actions;
  }
};
