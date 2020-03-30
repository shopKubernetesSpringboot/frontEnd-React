
// https://github.com/bellingard/sonar-scanner-npm
const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
    {
      serverUrl: "https://sonarcloud.io",
      token: "800c978596bce5c634f7fb4a0006670d12ddffe6",
      options: {
        'sonar.projectName': 'shop-web',
        'sonar.projectDescription': 'Front-end ReactJs for shop* micro-services',
        "sonar.organization": "davidgfolch-github",
        "sonar.sources": "./src",
        // "sonar.exclusions": "**/__tests__/**",
        "sonar.tests": 'src',
        "sonar.test.inclusions": "**/*.test.js",
        "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
        "sonar.testExecutionReportPaths": "test-report.xml",
        // 'sonar.log.level': 'TRACE',
        // 'sonar.verbose': 'true'
      },
    },
    () => {},
  );