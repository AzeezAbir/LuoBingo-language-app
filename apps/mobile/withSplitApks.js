const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withSplitApks(config) {
  return withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes('splits {')) {
      config.modResults.contents = config.modResults.contents.replace(
        /android\s*\{/,
        `android {
    splits {
        abi {
            enable true
            reset()
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
            universalApk false
        }
    }`
      );
    }
    return config;
  });
};
