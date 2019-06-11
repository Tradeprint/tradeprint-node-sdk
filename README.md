# Tradeprint Node.js SDK

[![CircleCI](https://circleci.com/gh/Tradeprint/tradeprint-node-sdk.svg?style=svg)](https://circleci.com/gh/Tradeprint/tradeprint-node-sdk)

## Introduction

Node.js SDK allows you to easily add your print on demand functionality to your app or website within minutes!
Print Postcards, Business Cards, Posters, Stickers on a roll, T-Shirts, etc.
Our Node.js SDK industry standardised documentation and instructions are easy to follow and would take a software engineer no longer than a few days to complete the full integration.

Node.js empowers organisations to create quick, robust network applications that can tackle parallel connections with increased throughput.
Our Sandbox print API environment allows you to interact with the API endpoints through the Node.js SDK.

As the API is created by our in-house team, we provide support to ensure it is set up and running smoothly.
Once up and running, we don’t anticipate a need for further maintenance from our side. However, we do expect some work to maintain your product catalogue.
This work includes adding, removing and editing products and can completed manually by your team, or parts can be automated.

Tradeprint API Documentation: https://docs.sandbox.tradeprint.io.

## Requirements

The recommended environment for using the SDK is *Node.js 8.x.x* and above (https://nodejs.org/).
 
Classes and promises are used extensively so *ECMAScript 2015* is the absolute minimum to use the package. 

## Installation

To install the package in your project:
```sh
npm install --save tradeprint-node-sdk
```
This will add the latest published module to your existing solution.

## Usage

The preferred method of using the SDK is through ECMAScript 2017 async/await:
```javascript
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

const request = orderService.submitNewOrderRequest();

// Set the properties of the request object to make it valid

// Run in an "async" function context
const response = await request.execute();

console.log(response);
```
This allows you to integrate the SDK in the most efficient way without having to chain promises or creating a "callback hell".

### Credentials

You need a set of valid Sandbox or Production credentials to access the Tradeprint Ordering and Products services.

Please get in touch at api(at)tradeprint.io or through our main https://www.tradeprint.co.uk/ website to be provided with a username and a password.

When you have a set of credentials then you can specify them in your code (instead of `'USERNAME'` and `'PASSWORD'` strings provided above), e.g.:

```javascript
SDK.setCredentials('johnSmith', 's3crEtP4s5');
```

### Tradeprint API

The SDK methods mirror the publicly available Tradeprint API endpoints and they allow the developer to post payloads to them in a convenient manner.

With a valid set of Sandbox or Production credentials, you can test the API in Postman and then use the same credentials to run your calls through the Node.js SDK.

View the API documentation at https://docs.sandbox.tradeprint.io.

### Sandbox and Production

Once you are ready with your integration and have tested the relevant methods in the Sandbox you can get in touch with our API Support Team
and get a set of Production credentials.

With that in place your production solution should be configured with those credentials and also the correct environment setup in the codebase:
```javascript
SDK.setEnvironment(SDK.Environments.Production);
```

**IMPORTANT** 

A solution configured with valid Production credentials and pointing at the Production environment will be communicating with live Tradeprint ordering system!

### Responses

All of the methods in the SDK return or resolve ResponseResult type JSON objects, e.g.:
```javascript
{ 
    timestamp: 1560124800000, 
    formattedDate: '10/06/2019' 
}
```

For failed calls you will get SdkError type JSON objecsts outlining the reason for the fail, e.g.:
```javascript
// "SdkError 400"
{
    "success":false,
    "errorMessage":"Validation failed",
    "errorDetails":[
        {
            "property":"instance.serviceLevel",
            "message":"is not one of enum values: Saver,Standard,Express",
            "argument":["Saver","Standard","Express"],
            "stack":"instance.serviceLevel is not one of enum values: Saver,Standard,Express"
        }
    ]
}
``` 
You can use try-catch blocks to handle these errors. Please see the code samples below for details.

### Code Samples

Please see the samples [README](samples/README.md) for details about the available code samples.
