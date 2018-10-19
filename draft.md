## Introduction 

## How to 

## Setup 

## Storage

When the user starts the app for the first time a user-object is created, this is used to keep track
of all information, including reminders. 

```JSON
{
    "id": "9ef14208-3446-4fca-bbd9-d891b9b0c7aa",
    "score": 1000,
    "reminders": [ ... ],
    "successful": [ ... ],
    "failed": [ ... ],
}
```
The object is stored with asyncStorage with 
Expo.constants.InstallationId as key. This means that user data will remain until 
the user deletes the app or flushes the app's storage. 
Every time a user creates a reminder an object is created and stored in reminders[], this array 
keeps track of all reminders that are active. When a user has successfully completed the reminder
it gets moved to successful[] or if the user gives up it gets moved to failed[]. 

```JSON 
{
    "id": "42f8198b-56c0-4ded-90ac-e07b6b79f077",
    "reminder": "Buy milk",
    "attempts": 0,
    "date": "Fri Oct 19  14:30:00 ",
    "dateMilliseconds": 1539952200000,
    "img": "file:///storage/emulated/0/DCIM/fe110000-7ba2-470a-8ae2-2d2112c0b6b5.jpg",
    "location": {
        "latitude": 63.4154103,
        "latitudeDelta": 0.04,
        "longitude": 10.4047432,
        "longitudeDelta": 0.05,
    },
    "locked": false,
    "imgHint": false,
    "mapHint": false,
    "notification": null,
}
```
Each reminder contains the following: 
* id: UUID 
* reminder(required): input from the user. 
* attempts: updated every time a user fails to complete the reminder, and is used to calculate the score. 
* date(required): stored in text(to display to the user) and milliseconds(for function logic). 
* img(optional): uri to the picture taken for the image hint. 
* location(optional): location of the user when creating a reminder, used for displaying a location hint, and to display all         completed reminders. 
* locked: indicates whether the reminder is locked or unlocked. A reminder is only unlocked two hours before the set date.
* imgHint: indicates whether the image hint has been used, will affect score.
* mapHint: indicates whether the map hint has been used, will affect score. 
* notification(optional): if given permission the application will schedule a notification for when 
    the reminder is unlocked. 

## Third party 

* Expo
  * Camera
  * Location
  * MapView
  * MediaLibrary
  * Notifications
* react-native-svg-charts
* react-native-elements
* react-native-maps
* react-native-action-button
* react-native-textinput-effects
* react-native-modal-datetime-picker
* react-native-vector-icons/MaterialCommunityIcons



