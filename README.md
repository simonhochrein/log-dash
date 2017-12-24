# Log-View
![npm version](https://img.shields.io/npm/v/log-view.svg)

![screenshot](https://raw.githubusercontent.com/simonhochrein/log-view/master/images/screenshot.png)

Log-View is a simple log viewer with a modern interface.

## Installation
To install just run
`npm i -g log-view`

## Usage
Log-View runs as a service. To start it, run `log-view --file firstFile.log --file secondFile.log`

Full Usage Below
```text
Usage: log-view <command> [options]

Commands:
  log-view start    Start the server
  log-view status   Current status of the server
  log-view stop     Stop the server
  log-view restart  Restart log server

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]
  --file, -f                                                          [required]

Examples:
  log-view start --file                     Start server with specified log
  /var/log/apache2/error.log

Copyright 2017
```

## Contribution
Pull requests are welcome and appreciated.