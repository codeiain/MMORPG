# MMORPG



## Prerequisite

This application requires [NodeJS](https://nodejs.org/en/download/) and [Ionic2]()

## Setup

Once both the above prerequisites are install, the command 
```
npm install -g ionic cordova
``` 
must be run to install the ionic framework globally.
Once this is complete all the required node packages can be installed by navigating to the project root directory and running ```npm install```

## Running the application

>The client application requires the server application to be running first.

Once the server application is running within a new terminal the command ```ionic serve``` will launch your default browser and load the application in dev mode.


### Details
The applicaiton is built using typescript and follows the following structure.

**src**
* app: This bootstraps the application, the only file within here that should ever be edited it the **app.modules.ts** file.
* assets: All images and static content should be stored in this directory.
* interfaces: All interfaces required for the application should be stored in this directory (Note: interfaces are a typescript only file when the typescript is translated to javascript these files will not be).
* pages: This is where all the applications pages are stored and should be within sub directories based on there section of the application, e.g all the character creation pages are stored in create-character.
* providers: all providers/services for the application should be stored in this directory within sub directory beased on function e.g all the Race Providers are in the RaceProviders directory.

**www**
This directory is cleared out on each build, so no content should be added to the directory or the application will over write then on build.

### Versioning
No code should be commited to master!! When code is merged into master this creates the electron build and creates 3 installers linux, OSX, and windows.

### Build Scripts
Within the buildScripts directory there is 3 files:
* CHANGELOG.md
* CreateRelease.sh
* CreateReleaseNote.sh

The 'CreateRelease.sh' is called by the CI system to create the installers for the applciation.

Once a PR is pushed to master the CreateReleaseNotes.sh should be run and thei will update the local CHANGELOG.md will all the changes since the last release to master.

