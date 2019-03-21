                         CELI APP
#############################################################

Setup:
"npm install"

Run:
"npm start" / "npm run expo"

#############################################################

celiapp
    ./package.json		NPM Installation Module
    ./App.js			Application Entry

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