---
id: installation
title: Installation
sidebar_label: Installation
---

`$ npm install op-google-cast --save`

or

`$ yarn add op-google-cast`

## Expo

Since Expo SDK 42, you can use this library in a custom-built Expo app.
There is a config plugin included to auto-configure `op-google-cast` when the native code is generated (`npx expo prebuild`).

> This package cannot be used in the "Expo Go" app because [it requires custom native code](https://docs.expo.io/workflow/customizing/).

Add the [config plugin](https://docs.expo.io/guides/config-plugins/) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "op-google-cast",
      ["expo-build-properties", { "ios": { "deploymentTarget": "14.0" } }]
    ]
  }
}
```

> The latest Google Cast SDK (currently [4.8.1](https://developers.google.com/cast/docs/release-notes#april-18,-2024)) only supports iOS 14 or newer, which we can configure using `expo-build-properties`. If you need to support older iOS versions, use an older version of the library but note that some features might not be available.

Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.io/workflow/customizing/) guide.

Then ignore the rest of this page and continue to [Setup](setup#expo).

## iOS

Thanks to autolinking, the package and its Google Cast SDK dependency are automatically installed when you run `pod install`.

> The latest Google Cast SDK (currently [4.8.1](https://developers.google.com/cast/docs/release-notes#april-18,-2024)) only supports iOS 14 or newer. **Ensure that you set deployment target to iOS 14 or higher.** Otherwise, an older version of the SDK will be installed and some features might not be available.

> Before v4.8.1, Google Cast used to publish different variants of the SDK based on whether they included Guest Mode support. That feature has been removed in the latest versions so now there's only a single SDK variant.

## Android

Insert the following into `android/app/build.gradle`:

```java
dependencies {
  // ...
  implementation "com.google.android.gms:play-services-cast-framework:${safeExtGet('castFrameworkVersion', '+')}"
}

def safeExtGet(prop, fallback) {
  rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}
```

By default, the latest version (`+`) of the Cast SDK is used. To use a specific version, set it in the root `android/build.gradle`:

```java
buildscript {
  ext {
    buildToolsVersion = "34.0.0"
    minSdkVersion = 22
    compileSdkVersion = 34
    targetSdkVersion = 34
    castFrameworkVersion = "21.4.0" // <-- Cast SDK version
  }
}
```

## Chrome

Not supported yet
