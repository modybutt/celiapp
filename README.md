![Project Logo](/.github/logos/combined_logos.png)

# Celiapp

An app to help people with [coeliac_disease](https://en.wikipedia.org/wiki/Coeliac_disease) control their intake of gluten.

## Project information
						  
[Report bugs here](https://forms.gle/cLYvsLpdG7K9TA6S6)

[Google drive folder](https://drive.google.com/drive/folders/14PHvjDnpShU3ikbmvI3tGRPABUAJEEVm?usp=sharing)

## Developer information

### Prerequisites

Install node & npm [from here](https://nodejs.org/en/)

Install expo-cli :  `npm install -g expo-cli`

Install the Expo client app on your android/IOS device


## Install & Run

Setup:
`npm install`

Run:
`expo start`

Note for windows users: If you get "error Invalid Regular Expression..." error, fix the node 
dependency as per this article: https://stackoverflow.com/a/58122821/488802

IOS: point camera app at QR code
Android: In Expo client app, open QR code

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

### Tools & Tutorails

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
