# Next Train - Melbourne
My first React Native project, a simple train app for Melbournians that allows you to add favourite journeys and keep track of their departure times. Currently only on iOS but the Android version will be released soon (once I get the time to integrate animation properly for the journey list).

## Links
- [App Store](https://itunes.apple.com/us/app/next-train/id1299647913?ls=1&mt=8)
- Google Play store coming soon

## Screenshots
<p align="center">
  <img src="https://github.com/dshaw1/next-train-rn/blob/master/docs/assets/screenshot_1.png" width="40%" height="auto" alt="Next Train screenshot 1"/>
  <img src="https://github.com/dshaw1/next-train-rn/blob/master/docs/assets/screenshot_2.png" width="40%" height="auto" alt="Next Train screenshot 2"/>
</p>

<p align="center">
  <img src="https://github.com/dshaw1/next-train-rn/blob/master/docs/assets/screenshot_3.png" width="40%" height="auto" alt="Next Train screenshot 3"/>
  <img src="https://github.com/dshaw1/next-train-rn/blob/master/docs/assets/screenshot_4.png" width="40%" height="auto" alt="Next Train screenshot 4"/>
</p>

TODO
- Automatically fetch new times, if required, when opening app from sleep

- Improve font/image scaling for small/big devices
- Customise UI for Android vs iOS
- Simplify and clean up components/large functions (e.g. Favourites) - probably create more "dumb" smaller component pieces and pass props
- Add Sentry for error reporting
- Add codepush
- Add to Google Play store
- Fix Android "white screen" after splash screen
