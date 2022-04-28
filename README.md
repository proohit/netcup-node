# Netcup-node

[![GitHub last commit](https://img.shields.io/github/last-commit/proohit/netcup-node)](https://github.com/proohit/netcup-node)
[![codecov](https://codecov.io/gh/proohit/netcup-node/branch/master/graph/badge.svg?token=QM9CHTM8UL)](https://codecov.io/gh/proohit/netcup-node)
[![build](https://github.com/proohit/netcup-node/actions/workflows/build.yml/badge.svg)](https://github.com/proohit/netcup-node/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/netcup-node?color=blue)](https://www.npmjs.com/package/netcup-node)
[![npm](https://img.shields.io/npm/dt/netcup-node)](https://www.npmjs.com/package/netcup-node)

A node wrapper for the [Netcup CCP API](https://www.netcup-wiki.de/wiki/CCP_API).

## Current support

- only [JSON Rest API](https://www.netcup-wiki.de/wiki/CCP_API#Anmerkungen_zu_JSON-Requests), no SOAP yet
- functions
  - `login`
  - `infoDnsZone`
  - `infoDnsRecord`
- error handling: on any response that isn't `2000` from Netcup, an error with the `longmessage` from Netcup is thrown

## Getting started

### Installation

```sh
npm install --save netcup-node
```

### Usage

```javascript
import NetcupApi from 'netcup-node';
const api = await new Netcup().init({
  apikey: '',
  apipassword: '',
  customernumber: '',
});
const dnsInfo = await api.infoDnsZone({ domainname: 'YOUR.DOMAIN' });
```
