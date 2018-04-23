'use strict'

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const exec = require('child_process').exec;
const configure = require('../configure');
const params = process.argv.slice(2);
const camelizeRE = /\-(\w)/g;

module.exports = () => {
    let templateName = params[1],
        projectName = params[2],
        gitCommand = ``,
        gitUrl = ``,
        branch = ``;

    if (!templateName) {
        console.log(colors.red('\n × Please enter template name.'));
        console.log(colors.green('√ coocss init <template-name>\n '));
        process.exit();
    }

    if (!projectName) {
        console.log(colors.red('\n × Please enter project name.'));
        console.log(colors.green('√ coocss init <template-name>\n '));
        process.exit();
    }

    if (!configure.templates[templateName]) {
        console.log(colors.red('\n × Template ' + templateName + ' is not exist! \n '));
        process.exit();
    }

    gitUrl = configure.templates[templateName].git;
    branch = configure.templates[templateName].branch;

    gitCommand = `git clone -b ${branch} ${gitUrl}`;

    console.log(colors.white('\n Waiting... \n'))

    exec(gitCommand, error => {
        if (error) {
            console.log(colors.red(error));
            process.exit();
        }
        exec(`rm -rf ./.git ./docs`, error => {
            if (error) {
                console.log(colors.red(error));
                process.exit();
            }
            console.log(colors.green('✨  Generation completed! \n'));
            console.log(`npm install \n`);

            process.exit();
        });
    });
};

function camelize(string) {
    string = string[0].toUpperCase() + string.slice(1);
    return string.replace(camelizeRE, (_, letter) => letter.toUpperCase());
}
