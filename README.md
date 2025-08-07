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

### Setting up the default character

To start, copy `.current.example.json` to `.current.json`

    cp .current.example.json .current.json

This is your character's current stats and won't be tracked by git.

### Display all attributes for a character

To display all transient attributes for the current stats, type:

    npm run attr

All character's transient attributes are displayed:

    Hit Points:
      Total:                16
      Head:                 6
      Arms:                 5
      Chest:                7
      Abdomen:              6
      Legs:                 6
    Skill Modifiers:
      Agility:              +5%
      Communication:        +5%
      Knowledge:            +5%
      Magic:                +5%
      Manipulation:         +10%
      Perception:           +5%
      Stealth:              +5%
    Other:
      Healing rate:         3
      DEX strike rank:      2
      SIZ strike rank:      1
      Damage bonus:         +1d4
      Spirit combat damage: 1d6+1
      Magic points:         15

### Display attribute changes when stats change

To check transient attribute changes set new stat value after `attr`:

    npm run attr pow=17

This shows attributes that change with the new stat, for example:

    Skill Modifiers:
      Agility:              +5% → +10%
      Manipulation:         +10% → +15%

Stat abbreviations are: `str`, `con`, `siz`, `dex`, `int`, `pow` and `cha`.

Multiple stat changes can be displayed at once:

    npm run attr str=17 pow=5

### Managing multiple characters

Create a directory named `characters` and a json stat file for each character you 
want to track.

    mkdir characters
    cp .current.example.json ./characters/paako.json

Set the correct stats for the characters using your favourite text editor.
These files won't be tracked by git.

To use a different stat file, give path to the file using environment variable 
`STATS`. For example:

    STATS=./characters/paako.json npm run attr
    STATS=./characters/paako.json npm run attr pow=16
