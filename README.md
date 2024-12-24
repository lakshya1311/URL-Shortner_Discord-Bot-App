# Getting Started with URL Shortner App and Discord Bot

## This app is developed using Express JS, Node Js, MongoDB , EJS , Discord JS
## This is standalone app of URL-Shortner, in which a Authenticated User can create a small URL, of any Url/Link he wishes to provide. User is Authorized to see onlt the Urls he has generated on the home page after logging-in. Admin User can see all the Urls.
## DISCORD BOT is also created, which integrates with the above app, to create short-urls.
## This DISCORD BOT can be hosted on any Discord Server using Discord Token mentioned in .env file.
## `create https://xyz.com` => this command when passed in the server where the BOT is active , BOT will reply with a short url for "https://xyz.com"

________________________________________________________________________________________________________________

## Prerequisites
Run the following command to install dependencies:

### `npm install`
_________________________________________________________________________________________________________________

## Environment variables
This project depends on some environment variables. If you are running this project locally, create a .env file at the root for these variables. Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

DISCORD_TOKEN
MONGO_URL
PORT 
SECRET

___________________________________________________________________________________________________________________

## Available Scripts

### `npm start`
Runs the app in the development mode.\

The page will reload when you make changes.\
You may also see any lint errors in the console.

Your app is ready !



