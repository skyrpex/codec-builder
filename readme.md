# codec-builder

Helps you build type-safe codecs.

## Installation

```sh
npm install codec-builder
```

## Usage

```ts
import { stringifier, parser } from "codec-builder";

type AllowedTypes = number | bigint;

const stringifyNumber = stringifier<AllowedTypes>((value) => value.toString());
const parseNumber = parser<AllowedTypes>((value) => BigInt(value));

const string = stringifyNumber(7777);
const number = parseNumber(string);
```
