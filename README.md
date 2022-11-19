# Netcup-node

[![codecov](https://codecov.io/gh/proohit/netcup-node/branch/master/graph/badge.svg?token=QM9CHTM8UL)](https://codecov.io/gh/proohit/netcup-node)
[![Known Vulnerabilities](https://snyk.io/test/github/proohit/netcup-node/badge.svg)](https://snyk.io/test/github/proohit/netcup-node)
[![build](https://github.com/proohit/netcup-node/actions/workflows/build.yml/badge.svg)](https://github.com/proohit/netcup-node/actions/workflows/build.yml)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=proohit_netcup-node&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=proohit_netcup-node)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=proohit_netcup-node&metric=bugs)](https://sonarcloud.io/summary/new_code?id=proohit_netcup-node)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=proohit_netcup-node&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=proohit_netcup-node)
[![GitHub last commit](https://img.shields.io/github/last-commit/proohit/netcup-node)](https://github.com/proohit/netcup-node)
[![npm](https://img.shields.io/npm/v/netcup-node?color=blue)](https://www.npmjs.com/package/netcup-node)
[![npm](https://img.shields.io/npm/dt/netcup-node)](https://www.npmjs.com/package/netcup-node)

A node wrapper for the [Netcup CCP API](https://www.netcup-wiki.de/wiki/CCP_API).

## Current support

- only [JSON Rest API](https://www.netcup-wiki.de/wiki/CCP_API#Anmerkungen_zu_JSON-Requests), no SOAP yet
- auto auth handling with support to use custom auth handling
- functions
  - `login`
  - `infoDnsZone`
  - `infoDnsRecord`
  - `updateDnsRecords`
  - `updateDnsRecordWithCurrentIp` to set the current public ip as destination. Works with ipv4 and ipv6. Default updates ipv4 only. Set parameter `useIpv6Only` to true to update ipv6 only. Set parameter `useIpv4AndIpv6` to true to update both ipv4 and ipv6. NOTE: Uses `public-ip` package to get the current public ip.
- error handling: on any response that isn't `2000` from Netcup, an error with the `longmessage` from Netcup is thrown

## ToDo

- ~~`login`~~
- ~~`infoDnsZone`~~
- ~~`infoDnsRecord`~~
- ~~`updateDnsRecords`~~ (0.0.5)
- ~~`updateDnsRecordWithCurrentIp`~~ (0.0.6)
- `logout`
- reseller api functions
- different formats

## Getting started

### Installation

```sh
npm install --save netcup-node
```

### Authentication

You will also need three things from Netcup CCP:

- apikey
- apipassword
- customernumber

After logging in to [Netcup CCP](https://www.customercontrolpanel.de/), navigate to [Stammdaten](https://www.customercontrolpanel.de/daten_aendern.php) and create the key/password there. The customernumber is next to your name at the top of the CCP.

### Usage

The default exported `NetcupApi` is a wrapper around the actual api. It handles authentication and passes parameters to the implemented api.

#### ESM

```javascript
import NetcupApi from 'netcup-node';
const api = await new NetcupApi().init({
  apikey: 'YOUR_API_KEY',
  apipassword: 'YOUR_API_PASSWORD',
  customernumber: 'YOUR_CUSTOMER_NUMBER',
});
const dnsInfo = await api.infoDnsZone({ domainname: 'YOUR.DOMAIN' });
```

If you prefer, you can use the `NetcupRestApi` directly, without using the integrated authentication state handling from the default exported `NetcupApi`.

```javascript
import { NetcupRestApi } from 'netcup-node';
const api = new NetcupRestApi();
const authResponse = await api.login({
  apikey: '',
  apipassword: '',
  customernumber: '',
});
const dnsRecords = await api.infoDnsRecords({
  apisessionid: authResponse.responsedata.apisessionid,
  apikey: 'YOUR_API_KEY',
  customernumber: 'YOUR_CUSTOMER_NUMBER',
  domainname: 'YOUR.DOMAIN',
});
```

#### CJS

```javascript
const NetcupApi = require('netcup-node').default;
// or const { NetcupApi } = require('netcup-node');

const api = await new NetcupApi().init({
  apikey: 'YOUR_API_KEY',
  apipassword: 'YOUR_API_PASSWORD',
  customernumber: 'YOUR_CUSTOMER_NUMBER',
});
const dnsInfo = await api.infoDnsZone({ domainname: 'YOUR.DOMAIN' });
```

### Reference

```javascript
/**
 * Initializes authentication parameters
 */
NetcupApi.init({
  apikey: 'YOUR_API_KEY',
  apipassword: 'YOUR_API_PASSWORD',
  customernumber: 'YOUR_CUSTOMER_NUMBER',
});

/**
 * Retrieves information about a DNS zone
 * */
NetcupApi.infoDnsZone({
  domainname: 'YOUR.DOMAIN',
});

/**
 * Retrieves information about DNS records of a domain
 * */
NetcupApi.infoDnsRecords({
  domainname: 'YOUR.DOMAIN',
});

/**
 * Updates DNS records of a domain and only those that are specified.
 */
NetcupApi.updateDnsRecords({
  domainname: 'example.com',
  dnsrecordset: {
    dnsrecords: [{ name: 'www', type: 'A', destination: 'some-ip' }],
  },
});
// can also be used for deletion
NetcupApi.updateDnsRecords({
  domainname: 'example.com',
  dnsrecordset: {
    dnsrecords: [
      { name: 'www', type: 'A', destination: 'some-ip', deleterecord: true },
    ],
  },
});

/**
 * Updates DNS records of a domain with the current public ip.
 * @example
 * // update ipv4 only
 * await api.updateDnsRecordsWithCurrentIp({ domainname: 'example.com', dnsrecords: [{ hostname: 'www' }] })
 * @example
 *  // update ipv4 and ipv6
 *  await api.updateDnsRecordsWithCurrentIp({ domainname: 'example.com', dnsrecords: [{ hostname: 'www' }], useIpv4AndIpv6: true })
 * @example
 * // update ipv6 only
 * await api.updateDnsRecordsWithCurrentIp({ domainname: 'example.com', dnsrecords: [{ hostname: 'www' }], useIpv6Only: true })
 */
// update ipv4 only
NetcupApi.updateDnsRecordWithCurrentIp({
  domainname: 'example.com',
  dnsrecordset: { dnsrecords: [{ hostname: 'www' }] },
});

// update ipv4 and ipv6
NetcupApi.updateDnsRecordWithCurrentIp({
  domainname: 'example.com',
  dnsrecordset: { dnsrecords: [{ hostname: 'www' }] },
  useIpv4AndIpv6: true,
});

// update ipv6 only
NetcupApi.updateDnsRecordWithCurrentIp({
  domainname: 'example.com',
  dnsrecordset: { dnsrecords: [{ hostname: 'www' }] },
  useIpv6Only: true,
});
```
