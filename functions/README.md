# Firebase Cloud Functions

See the [Firebase Cloud Functions documentation](https://firebase.google.com/docs/functions) for the complete details.

## [Local Emulator](https://firebase.google.com/docs/functions/local-emulator)

### [Set up functions configuration](https://firebase.google.com/docs/functions/local-emulator#set_up_functions_configuration_optional)

Run the following command in the `functions` directory.

```
firebase functions:config:get > .runtimeconfig.json
```

### [Instrument app for callable functions](https://firebase.google.com/docs/functions/local-emulator#instrument_your_app_for_callable_functions)

```
firebase.functions().useEmulator("localhost", 5001);
```
