# Parcel React Boilerplate

## Features
**React**   
This boilerpalte based on React
**React Router**  
Boilerplate has React Router installed  
**Parcel**  
Parcel is used as bundler  
**ESlint**  
ESLint is included with "eslint-plugin-react". It can be configured inside *.eslintrc* file  
**Babel**  
This boilerplate has preinstalled babel plugins for React  
**CSS Modules**  
You can use SASS/SCSS in your code, "postcss-modules" package is included


## Quick start
1. Make sure that you have Node.js v8.15.1 and npm v5 or above installed
2. Clone this repo using command below. Don't forget to **set** your own <PROJECT_NAME>
```
project_name=<PROJECT_NAME> && git clone --depth=1 --branch=master https://github.com/danil-kuk/Parcel-React-Boilerplate.git ${project_name} && cd ${project_name} && rm -rf .git
```
3. Run `npm run install` in order to install dependencies
4. Now you can run `npm start` to run example app


## Start
```
npm run start
```

## Deploy to GitHub Pages
This boilerplate supports easy one-command deploy to GitHub Pages.  
Before deploy you should **edit** "Set your GitHub UserName and Repo" section in *deploy.sh* file.  
Now you can deploy your app to GH Pages with one command:
```
npm run deploy
```
*Note:* If you have problems with permissions try to run `chmod +x deploy.sh` in terminal to allow executing deploy script


## Lint
```
npm run lint
```
