# release-history
> History markdown from git tags

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Usage

Install:

```bash
$ npm i -g release-history
```

CLI:
```bash
$ release-history --help

Usage: release history.js [options] [command]

  Commands:

    help  Display help

  Options:

    -c, --commit-base-url         set the remote url for linking to commits, e.g. https://github.com/stbaer/release-history/commits (defaults to "")
    -d, --dry-run                 only log commands without executing them (disabled by default)
    -e, --exclude-strings <list>  excludes a commit if its title contains this string (defaults to [])
    -h, --help                    Output usage information
    -i, --include-strings <list>  includes a commit if its title contains this string (defaults to [])
    -o, --out [value]             output file (defaults to "History.md")
    -v, --version                 Output the version number
```

## Licence

MIT, see [LICENSE](https://github.com/stbaer/release-history/blob/master/LICENSE) for details.
