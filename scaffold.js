'use strict';
let fullName, fullUnderscoreName, name, upperName, isFull, isJs, isData;

const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs-extra');

const copyDir = 'helpers/.scaffold/';
const installDir = 'source/components/';

const regName = /\{name}/g;
const regFullName = /\{fullName}/g;
const regFullUnderscoreName = /\{fullUnderscoreName}/g;
const regUpperName = /\{Name}/g;
const regRemove = /\{isJs}|\{isNoJs}|\{isData}|\{isNoData}/g;

const groups = [
    {
        id: 'sass',
        name: 'SCSS file',
        isMinimal: true,
    },
    {
        id: 'js',
        name: 'JS file',
        isMinimal: true,
        onlyIfJs: true,
    },
    {
        id: 'template',
        name: 'Template file (hbs)',
        isMinimal: true,
    },
    {
        id: 'data',
        name: 'Template data file (json)',
    },
    {
        id: 'jsTests',
        name: 'JS tests',
        onlyIfJs: true,
    },
    {
        id: 'visualTests',
        name: 'Visual tests',
        isMinimal: false,
    },
    {
        id: 'docs',
        name: 'Documentation (md and doc page)',
    },
];

const files = [
    {
        groupId: 'jsTests',
        file: 'tests/funit/{name}-tests.html',
        onlyIfJs: true,
    },
    {
        groupId: 'jsTests',
        file: 'tests/funit/{name}-tests.js',
        onlyIfJs: true,
    },
    {
        groupId: 'visualTests',
        file: 'tests/visual/test-{name}_page{isData}.hbs',
        onlyIfData: true,
    },
    {
        groupId: 'visualTests',
        file: 'tests/visual/test-{name}_page{isNoData}.hbs',
        onlyIfNoData: true,
    },
    {
        groupId: 'visualTests',
        file: 'tests/visual/testdata_{name}.json',
        onlyIfData: true,
    },
    {
        groupId: 'visualTests',
        file: 'tests/visual/visualtests-{name}.js',
    },
    {
        groupId: 'sass',
        file: '_{fullUnderscoreName}{isJs}.scss',
        onlyIfJs: true,
    },
    {
        groupId: 'sass',
        file: '_{fullUnderscoreName}{isNoJs}.scss',
        onlyIfNoJs: true,
    },
    {
        groupId: 'js',
        file: '{fullUnderscoreName}.js',
        onlyIfJs: true,
    },
    {
        groupId: 'template',
        file: '{fullUnderscoreName}{isJs}{isData}.hbs',
        onlyIfJs: true,
        onlyIfData: true,
    },
    {
        groupId: 'template',
        file: '{fullUnderscoreName}{isJs}{isNoData}.hbs',
        onlyIfJs: true,
        onlyIfNoData: true,
    },
    {
        groupId: 'template',
        file: '{fullUnderscoreName}{isNoJs}{isData}.hbs',
        onlyIfNoJs: true,
        onlyIfData: true,
    },
    {
        groupId: 'template',
        file: '{fullUnderscoreName}{isNoJs}{isNoData}.hbs',
        onlyIfNoJs: true,
        onlyIfNoData: true,
    },
    {
        groupId: 'data',
        file: '{fullUnderscoreName}.json',
        onlyIfData: true,
    },
    {
        groupId: 'docs',
        file: 'zdocs_{name}_page.hbs',
    },
    {
        groupId: 'docs',
        file: 'README{isData}.md',
        onlyIfData: true,
    },
    {
        groupId: 'docs',
        file: 'README{isNoData}.md',
        onlyIfNoData: true,
    },
];

function replaceNames(str){
    return str
        .replace(regFullName, fullName)
        .replace(regFullUnderscoreName, fullUnderscoreName)
        .replace(regName, name)
        .replace(regUpperName, upperName)
        .replace(regRemove, '')
    ;
}

function handlePreset(answers){
    let choices = [];
    let handledChoices = {};

    name = answers.name;

    if(answers.prefix != '-'){
        fullName = answers.prefix +'-'+ name;
        fullUnderscoreName = answers.prefix +'_'+ name;
    } else {
        fullName = name;
        fullUnderscoreName = name;
    }

    upperName = name[0].toUpperCase() + name.substr(1);

    isFull = answers.preset.indexOf('full') != -1;
    isJs = answers.preset.indexOf('js') != -1;
    isData = isFull || answers.preset.indexOf('medium') != -1;


    groups.forEach((item) => {
        if(handledChoices[item.id] || (!isJs && item.onlyIfJs) || (!isData && item.onlyIfData)){return;}

        handledChoices[item.id] = true;

        choices.push({
            name: item.name,
            value: item.id,
            checked: isFull || item.isMinimal || isData && item.id == 'data',
        });
    });

    checkoutScaffold(choices);
}

function questionPreset(){

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your component?',
            validate: (value) => {
                return !!(value.match(/^[a-z_0-9]+$/)) || 'The name can only consist of latin letters.';
            },
        },
        {
            type: 'input',
            name: 'prefix',
            message: 'What prefix do you want to use? (type "-" for no namespace)',
            default: () => { return 'rb'; },
        },
        {
            type: "list",
            name: "preset",
            message: "What kind of component do you want to generate?",
            choices: [
                new inquirer.Separator('Minimum: (no data, no docs, no unit tests)'),
                {
                    name: "- Minimal without JS",
                    value: "min"
                },
                {
                    name: "- Minimal with JS",
                    value: "min_js"
                },
                new inquirer.Separator('Medium: (no docs, no unit tests)'),
                {
                    name: "- Medium without JS",
                    value: "medium"
                },
                {
                    name: "- Medium with JS",
                    value: "medium_js"
                },
                new inquirer.Separator('Full:'),
                {
                    name: "- Full without JS",
                    value: "full"
                },
                {
                    name: "- Full with JS",
                    value: "full_js"
                },
            ]
        },
    ];

    inquirer.prompt(questions).then( (answers) => {
        handlePreset(answers);
    });
}

function checkoutScaffold(choices){
    inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Should we scaffold the following checked files for you?',
            name: 'fileGroups',
            choices: choices,
            validate: (answer) => {
                if ( answer.length < 1 ) {
                    return 'You must choose at least one file group.';
                }
                return true;
            }
        }
    ]).then( ( answers ) => {
        copyFiles(answers.fileGroups);
    });
}

function copyFiles(fileGroups){
    let baseInstallPath = path.join(installDir, fullUnderscoreName);

    files.forEach(function(file){
        let content, installPath;

        if((file.onlyIfJs && !isJs) ||
            (file.onlyIfNoJs && isJs) ||
            (file.onlyIfNoData && isData) ||
            (file.onlyIfData && !isData) ||
            fileGroups.indexOf(file.groupId) == -1
        ){return;}
        
        installPath = path.join(baseInstallPath, replaceNames(file.file));

        if(fs.existsSync(installPath)) {
            console.log(installPath + ' already exists. No action.');
            return;
        }

        content = replaceNames(fs.readFileSync(path.join(copyDir, file.file), 'utf8') || '');
        
        fs.outputFile(installPath, content, (error) => {
            if(error) {
                return console.log(error);
            }
        });
        
    });

    console.log('Installed to: '+ baseInstallPath);
}

questionPreset();
