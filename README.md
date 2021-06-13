# Start the App
## Local setup
### Install
Run the following command in from the project root directory:
```
npm install
```
### Start
Run the following command in from the project root directory: 
```
npm start
```
# Setup 
## Environment variable:

```
# Discord API setup
# The discord's api URL
REACT_APP_DISCORD_API_URL=https://discord.com/api

# The discord app client id (discord dashboard provide it)
REACT_APP_DISCORD_CLIENT_ID=

# The discord app client secret (discord dashboard provide it)
REACT_APP_DISCORD_CLIENT_SECRET=

# URL where the user will be redirected after autorization grant (must be configured in discord dashboard) 
REACT_APP_DISCORD_LOGIN_REDIRECT=http://localhost:3000

# Authorization scope needed by this dashboard on discord API
REACT_APP_DISCORD_AUTH_SCOPE=identify


# Aleeva API Setup
# The aleeva client id
REACT_APP_ALEEVA_CLIENT_ID=
# The aleeva client secret
REACT_APP_ALEEVA_CLIENT_SECRET=
# The aleeva auth scopes 
REACT_APP_ALEEVA_AUTH_SCOPE=
```