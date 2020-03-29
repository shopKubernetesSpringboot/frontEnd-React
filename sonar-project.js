sonarqubeScanner(
    {
      serverUrl: "https://sonarcloud.io",
      token: "800c978596bce5c634f7fb4a0006670d12ddffe6",
      //travis encrypt --pro 800c978596bce5c634f7fb4a0006670d12ddffe6
      //secure: "ptasI+eM/V/CICVtPI8n3cZA2MuOvWtmH4+rwmXu9WrP1FOuoYsfgAPj8ir9lmAk9g58zlpymHQ9Nu7HE80DoQ67rgBZ0PZ17XGdURbe/Jk+xL/kweaJjbm3USEJ5K4hiGaRsyG3GL6zinIKKZts1zSU1Y9kznCVm06I4+pV/zUQ4eDOqmV9FBYo3GNcFecmdZKEnoTXX6yvy5gDjyGYFBbew+vcC+cSVbfjUaHYFWsrOs5wxasGk+pd+QzZP+MyM1dHq8J+ZvFN3MSqmoKp+9M7CYPajTIf7eeswvJ3YPDHh2VOWwa0m7ErEHOBpaJjIITOGf/O45H+t/3AuvMKGaOsz5CRkdqfrjxMXQb25liDwBX5z5TdLkw3MGAeFEbKihB0+2Pf8ox22IovoAlhwWc0vh6DSizF7MSaZPwa58dMoOaxzQRm937ppRIZ/MBWuWs0MN5d2NKNvUSnVU49duI4uszbumViukdCjXEyJjDoUaTUmr8AxFHc7qMkiGi5DNujgYU/8KJp5baHTm1WKVZ5sYmu1URqyFIxXXNY59xmhF31ERoyPU5pzltUlBn5xo4DwEtvrGYKuxYCoERMtLjw2xpDVsBxFINl4doWxepFIxyB6Bc4lugb017JG40ToVmjj2Zdf7G4yZtFVsqhrQ9HEV7juTa5c2A4OV1lLZI="
      options: {
        "sonar.sources": "./src",
        "sonar.exclusions": "**/__tests__/**",
        "sonar.tests": "./src/__tests__",
        "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
        "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
        "sonar.testExecutionReportPaths": "test-report.xml",
      },
    },
    () => {},
  );