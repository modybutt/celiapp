![Project Logo](/.github/logos/combined_logos.png)

# CeliApp

An app to help people with [coeliac disease](https://en.wikipedia.org/wiki/Coeliac_disease) control their intake of gluten.

## Project information
						  
[Report bugs here](https://forms.gle/cLYvsLpdG7K9TA6S6)

[Google drive folder](https://drive.google.com/drive/folders/14PHvjDnpShU3ikbmvI3tGRPABUAJEEVm?usp=sharing)

[CeliApp kanban board](https://github.com/itcgames/celiapp/projects/1)

## Developer information

### Working on stories

We try to show all planned and ongoing design & development work on this [board](https://github.com/itcgames/celiapp/projects/1). 

Stories are assigned whoever agreed to do it. If you pick up an unassigned story, assign yourself AND move to In Progress. Don't pick up a story assigned to someone else with out checking with assignee first. 

Finally, the stories in backlog are (typically) unprioritized and maybe unrefined, so probably should check with the group before starting a backlog story.

### Prerequisites

Install node & npm [from here](https://nodejs.org/en/)

Install expo-cli :  `npm install -g expo-cli`

Install the Expo client (capable Version 2.16.1 for expo-SDK 35) app on your android/IOS device 


## Install & Run

Setup (npm clean install):
`npm ci`

Run:
`expo start`

Note for windows users: If you get "error Invalid Regular Expression..." error, fix the node 
dependency as per this article: https://stackoverflow.com/a/58122821/488802

IOS: point camera app at QR code
Android: In Expo client app, open QR code

## Testing

To run all unit tests:
`npm test`

## Application Files

```
celiapp
    ./package.json		NPM Installation Module
    ./app.json			Application Configuration
    ./App.js			Application Entry
    ./babel.config.js		Babel Configuration File (EXPO)
    ./docdev/***		Development Documentation Files

celiapp/__tests__
    ./***-test.js		Application Test Files (JEST)	

celiapp/src/constants
    ./***.js			Global Configuration Files

celiapp/src/assets
    ./fonts/***.ttf		Font Ressources
    ./images/***.png		Image Ressources 

celiapp/src/navigation
    ./AppNavigator.js		Navigation Logic
    ./MainTabNavigator.js	Main Navigation

celiapp/src/components
    ./***.js			Shared Component Library
    ./android/***.js		Native Android Components
    ./ios/***.js		Native iOS Components

celiapp/src/screens
    ./***.js			MainTabNavigator Screens
    ./***/***.js		Sub Screens, Dialogs, ...
    
```

### Tools & Tutorials

* REACT NATIVE: 		https://facebook.github.io/react-native/docs/getting-started
* EXPO: 			https://expo.io
* JEST:			https://jestjs.io
* Android Studio: 	https://developer.android.com/studio
* Icons Library: 		https://ionicons.com
* Import Organizer: 	https://github.com/tleunen/babel-plugin-module-resolver
* Tortoise GitSVN: 	https://tortoisegit.org
* EXPO-SQLite:		https://github.com/expo/expo/tree/master/packages/expo-sqlite


### Useful Git Commands

```
git pull			update repo from master
git commit -m "Commit Message"	commit local changes to repo
git push			push local repo to master
// ... merge & pull request?
```

# Usage

```bash
npm install
```


npm i react-devtools@2.5.2

run  react_native_debugger-0.10.13-setup.exe  // in downloads

run app in simulator

turn on remote debugging

in RNDebugger <cntrl>-R to listing on 19001