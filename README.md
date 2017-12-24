# Log-Dash
![npm version](https://img.shields.io/npm/v/log-dash.svg)

![screenshot](https://raw.githubusercontent.com/simonhochrein/log-dash/master/images/screenshot.png)

Log-Dash is a simple log viewer with a modern interface.

## Installation
To install just run
`npm i -g log-dash`

## Usage
Log-Dash runs as a service. To start it, run `log-dash --file firstFile.log --file secondFile.log`

Full Usage Below
```text
Usage: log-dash <command> [options]

Commands:
  log-dash start    Start the server
  log-dash status   Current status of the server
  log-dash stop     Stop the server
  log-dash restart  Restart log server

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]
  --file, -f                                                          [required]

Examples:
  log-dash start --file                     Start server with specified log
  /var/log/apache2/error.log

Copyright 2017
```

## Contribution
Pull requests are welcome and appreciated.