# APP VERSION CHECKER API

Developing mobile apps can be interesting when you are able to let your users learn of new changes and provide an easy flow to redirect them to a store where they can upgrade the app.

This API can be integrated with your mobile app to check the app's current version versus the most recently published version. If there is a new version on the mobile store, you may inform your user to do and update, to get better features.

Instructing users to update their apps can either be forced or just informational. You will need to call just one API.

### API Contract:

```bash
Method: GET
```

```bash
Route: https://localhost:3001/api/v1/project/versions/check
```

> This API is used for checking if the app version is marked for upgrade or not.

```bash
Request Headers:

Header Name: x-api-key
Description: unique api key to access app versions for your project
Key sample: MDNmNmZkNDEtNmNkMi00NzY3LThjOWEtYWYxMGFjZWQ0ZjI2
You can find the x-api-key in Accounts tab.
```

Request Queries

| Query Name   | Description                                | Sample Date   | rule       |
| ------------ | ------------------------------------------ | ------------- | ---------- |
| app_name     | you app name                               | Career Hunter | `required` |
| app_version  | you app version                            | 1.0.7         | `required` |
| platform     | your app platform                          | andriod       | `required` |
| environment  | you app environment                        | production    | `required` |
| app_language | you app language (useful for localization) | 'en'          | `optional` |

```bash
Request Example:

GET 'https://localhost:3001/api/v1/project/versions/check?app_name=career hunter&app_version=1.0.7&platform=android&environment=production&app_language=en'

header

'x-api-key: MDNmNmZkNDEtNmNkMi00NzY3LThjOWEtYWYxMGFjZWQ0ZjI2'
```

### Response

When a version is matched/ found, the following response get returned from the API

```json
{
"found": true,
"forceUpgrade": true,
"message": "Update message.",
"query": {
"app_name": "Wallpaper app",
"app_version": "1.0.0",
"platform": "android",
"environment": "production",
"app_language": "en" //optional if passed in query param.
}
```

When a version is not matched/found, the following response get returned from the API

```json
{
"found": false,
"query": {
"app_name": "Wallpaper app",
"app_version": "1.0.0",
"platform": "android",
"environment": "production",
"app_language": "en" //optional if passed in query param.
}
```

The API will respond with the required checks. If found is true that means app is marked for upgrade.

If `forceUpgrade` is `true` that means app needs to force the user to update the app. If `false` than just show a popup to user for upgrade but it's not mandatory.

#### Usage

This API call can be made on start of the app or periodically, to check for the upgrade and if it is required or not
