# React Components Library Template

This is not a real library, rather a template. Can be used as an example of how to create libraries
using Rollup as a bundle tool.

```
npm run build
npm run post:build
cd dist
npm publish
```

It will work only if you have .npmrc with GitHub auth token inside.

You can find the lib here:
https://github.com/users/ikos23/packages/npm/package/react-components-lib-with-rollup.

Usage:

```
// just a normal import
import { Clock } from "@ikos23/react-components-lib-with-rollup";

// better
import { Clock } from "@ikos23/react-components-lib-with-rollup/Clock";
```
