## Welcome to the Advent of Goodly Deeds!

🎀

A React/ES6/Local Storage/[Bulma](bulma.io)/[Bulma React Components](https://github.com/couds/react-bulma-components)/SASS/[DayJS](https://github.com/iamkun/dayjs) powered advent calendar offering a good deed per day.

![Tree Team](https://github.com/d0tmatrix/adventofgoodlydeeds/blob/master/src/img/team.png?raw=true)

### How it works:

When first loaded in a browser, the advent calendar assigns one good deed per day from a predefined list to local storage.
Subsequent runs load the calendar that belongs to that browser. This ensures each browser has a unique calendar.
Only on a given day can the good deed for that day be accessed via the UI. Days in the passed show the image for that day.

This app deploys and builds easily via [now](https://zeit.co/home) using the command `now --prod`

To develop, first run `yarn` to install deps, then run

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
