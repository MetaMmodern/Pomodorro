module.exports = {
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  runner: "jest-runner",
  // This configuration shows the Jest to an array of regex expression sample strings which are matched towards all source record paths, matched documents will pass transformation
  transformIgnorePatterns: ["/node_modules/"],
  // This configuration indicates the Jest which take a look at  test environment it need to use for the testing run
  testEnvironment: "jest-environment-jsdom",
  // This configuration factors to the glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  // This configuration indicates the Jest to an array of regexp pattern strings that are matched towards all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/"],
  // This configuration shows the Jest framework to the list of paths to directories that Jest ought to use to look for files inside them
  roots: ["<rootDir>"],
  coverageDirectory: "coverage",
  // This property shows that an array of regexp sample strings used to skip the test coverage collection
  coveragePathIgnorePatterns: ["/node_modules/"],
  // It indicates an array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules"],
  reporters: [
    "default",
    // [
    //   "./node_modules/jest-html-reporter",
    //   {
    //     pageTitle: "Test Report",
    //     outputPath: "test-report/index.html",
    //     includeFailureMsg: true,
    //   },
    // ],
    [
      "jest-html-reporters",
      {
        publicPath: "./test-report/",
        filename: "index.html",
        expand: true,
      },
    ],
  ],
};
