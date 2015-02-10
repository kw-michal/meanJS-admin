'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the' + chalk.red('meanJS-admin') + ' generator!'
    ));

    var prompts = [
    // {
    //   type: 'confirm',
    //   name: 'someOption',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }
    ];

    this.prompt(prompts, function (props) {
      //this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('app/'),
        this.destinationPath('app/')
      );
      this.fs.copy(
        this.templatePath('public/'),
        this.destinationPath('public/')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
