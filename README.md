# Taxbot

A simple chat bot that answer general country tax questions.

# Development setup

### 0. Setup NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

Ref: https://github.com/nvm-sh/nvm

### 1. Install node 10.x lts or newer.

```
nvm install lts/dubnium
```

Check node is installed

```
node -v
```

### 2. Install dependencies

```
npm i
```

### 3. (optional) Install nodemon for faster development loop

```
npm install -g nodemon
```

# Run 

```
BOT_TOKEN=XXXXXXXXXX node index.js
```
