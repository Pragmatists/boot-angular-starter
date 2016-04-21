starter/web
=================

* `npm install` - install all required dependencies

* `npm run clean` - clean build directory

* `npm test` - run tests

* `npm run build` - run tests and build

* `npm start` - build and serve on
  [http://localhost:3000]( http://localhost:3000 )
  with live reload turned on
 
Profiles
--------

Available profiles are `dev` and `prod`. They can be set with 
 `--profile` flag (or shorthand `-p`). By default `dev` profile
  is used.
 
Examples of correct profile usage:

* `gulp serve`
* `gulp serve -p dev`
* `gulp serve --profile=prod`

Remember to provide extra `--` before gulp arguments when calling 
 through npm. For example `npm start -- --profile=dev`.
