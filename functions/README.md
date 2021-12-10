# Firebase Cloud Functions

See the [Firebase Cloud Functions documentation](https://firebase.google.com/docs/functions) for the complete details.

## Environment Configuration

[Set environment configuration for your project](https://firebase.google.com/docs/functions/config-env#set_environment_configuration_for_your_project) by storing storing environment data in Cloud Functions.
Example:

```
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```

Use the environment data by accessing `functions.config()` with the service name and key, like `functions.config().someservice.key` or the following:

```
const STRIPE_SECRET_KEY = functions.config().stripe_test_mode.secret_key;
const STRIPE_WH_SECRET = functions.config().stripe_test_mode.webhook_secret;
```

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

## Stripe Integration

### Webhooks

Helpful documentation:

- https://stripe.com/docs/stripe-cli/webhooks
- https://stripe.com/docs/cli/trigger
