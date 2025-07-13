# RuneQuest Transients 

This will help you figure out which transient attributes change when your stats change.

**NOTE!** This is a work in progress and now mainly contains the skeleton on how to do this.
Pls send PRs for other attributes as they are tedious to write!

## Quick start

### Install nvm 

For mac users using brew

    brew install nvm

For other options, maybe see https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

### Setup project

Clone this project, go to project directory and

    nvm install
    nvm use
    npm install
    npm run test

## Usage

To start, copy `.current.example.json` to `.current.json`

    cp .current.example.json .current.json

This is your character's current stats and won't be tracked by git.

To check transient attribute changes, type for example:

    npm run diff pow=20

This shows attributes that change with the new stat, for example:

    Magic points: 15 -> 20
    Hit points: 16 -> 17

Stat abbreviations are: `str`, `con`, `siz`, `dex`, `int`, `pow` and `cha`.
