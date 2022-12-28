<h1 align="center">Welcome to aggregatets 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/ts-template" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/ts-template.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Mongo like aggregations on arrays

## Install

```
yarn add aggregatets
```

or using `npm`

```
npm i aggregatets
```

## Basic Usage

```js
import aggregate from 'aggregatets'

const list = [{ name: 'test', value: 10 }, { name: 'jhon', value: 32 }, { name: 'Ester', value: 150 }]

const result = aggregate(list, [
  {
    $project: {
      name: 1
    }
  }
])

console.log(result)
// [ {name: 'test', }, { name: 'jhon' }, { name: 'Ester' }]

```

## Development

> to update or improve this project

### Setup

```sh
yarn install
```

### Run

```sh
make
```

### Run tests

```sh
make test
```

## Features

- [X] $match
  - [ ] $match with regex
- [X] $project
- [X]] $group
- [ ] $sort

## Author

👤 ** edgardleal **

* Website: https://github.com/edgardleal
* Github: [@edgardleal](https://github.com/edgardleal)

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.buymeacoffee.com/edgardleal" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
