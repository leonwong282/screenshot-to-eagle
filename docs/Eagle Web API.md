# /api/application/info

`GET` Get detailed information on the Eagle App currently running. In most cases, this could be used to determine whether certain functions are available on the user's device.

**Sample Code:**

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:41595/api/application/info", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Results Returned:**

```javascript
{
    "status": "success",
    "data": {
        "version": "1.11.0",
        "prereleaseVersion": null,
        "buildVersion": "20200612",
        "execPath": "/Users/augus/Projects/Eagle App/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Helper (Renderer).app/Contents/MacOS/Electron Helper (Renderer)",
        "platform": "darwin"
    }
}
```



# /api/item/addFromURL

**`POST`** Add an image from an address to Eagle App. If you intend to add multiple items in a row, we suggest you use `/api/item/addFromURLs`.

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| url              | Required，the URL of the image to be added. Supports `http`、 `https`、 `base64`                                    |
| name             | Required，The name of the image to be added.                                                                        |
| website          | The Address of the source of the image                                                                              |
| tags             | Tags for the image.                                                                                                 |
| star             | The rating for the image.                                                                                           |
| annotation       | The annotation for the image.                                                                                       |
| modificationTime | The creation date of the image. The parameter can be used to alter the image's sorting order in Eagle.              |
| folderId         | If this parameter is defined, the image will be added to the corresponding folder.                                  |
| headers          | Optional, customize the HTTP headers properties, this could be used to circumvent the security of certain websites. |

**Sample Code:**

```javascript
var data = {
    "url": "https://cdn.dribbble.com/users/674925/screenshots/12020761/media/6420a7ec85751c11e5254282d6124950.png",
    "name": "Work",
    "website": "https://dribbble.com/shots/12020761-Work",
    "tags": ["Illustration", "Design"],
    "modificationTime": 1591325171766,
  "headers": {
    "referer": "dribbble.com"
  }
};

var requestOptions = {
  method: 'POST',
  body: JSON.stringify(data),
  redirect: 'follow'
};

fetch("http://localhost:41595/api/item/addFromURL", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Results Returned:**

```javascript
{
    "status": "success"
}
```
# /api/folder/list

**`GET`** Get the list of folders of the current library.

**Sample Code:**

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:41595/api/folder/list", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Results Returned:**

```javascript
{
    "status": "success",
    "data": [
        {
            "id": "JMHB2Y3Y3AA75",
            "name": "UI Design",
            "description": "",
            "children": [],
            "modificationTime": 1537854867502,
            "tags": [],
            "imageCount": 33,
            "descendantImageCount": 33,
            "pinyin": "UI Design",
            "extendTags": []
        },
        {
            "id": "JMHB2Y3Y3AA76",
            "name": "Post Design",
            "description": "",
            "children": [],
            "modificationTime": 1487586362384,
            "tags": [],
            "imageCount": 2800,
            "descendantImageCount": 2800,
            "pinyin": "Post Design",
            "extendTags": []
        },
        {
            "id": "JMHB2Y3Y3AA77",
            "name": "Movie Post Design",
            "description": "",
            "children": [],
            "modificationTime": 1487586529221,
            "tags": [],
            "imageCount": 449,
            "descendantImageCount": 449,
            "pinyin": "Movie Post Design",
            "extendTags": []
        },
        {
            "id": "JMHB2Y3Y3AA78",
            "name": "Business Card Design",
            "description": "",
            "children": [],
            "modificationTime": 1494390324202,
            "tags": [
                "Business Card"
            ],
            "imageCount": 1236,
            "descendantImageCount": 1236,
            "pinyin": "Business Card Design",
            "extendTags": [
                "Business Card"
            ]
        }
    ]
}
```
# /api/folder/listRecent

**`GET`** Get the list of folders recently used by the user.

**Sample Code:**

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:41595/api/folder/listRecent", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Results Returned:**

```javascript
{
    "status": "success",
    "data": [
        {
            "id": "KBCB8BK86WIW1",
            "name": "Industrial",
            "description": "",
            "children": [],
            "modificationTime": 1591972345736,
            "tags": [],
            "password": "",
            "passwordTips": "",
            "images": [],
            "isExpand": true,
            "newFolderName": "Industrial",
            "imagesMappings": {},
            "imageCount": 11,
            "descendantImageCount": 11,
            "pinyin": "GONGYEFENG",
            "extendTags": []
        },
        {
            "id": "KBBPIOY46SRWP",
            "name": "Scandinavian",
            "description": "",
            "children": [],
            "modificationTime": 1591773342438,
            "tags": [],
            "password": "",
            "passwordTips": "",
            "images": [],
            "isExpand": true,
            "newFolderName": "Scandinavian",
            "imagesMappings": {},
            "imageCount": 72,
            "descendantImageCount": 72,
            "pinyin": "BEIOUFENGGE",
            "extendTags": []
        }
    ]
}
```
