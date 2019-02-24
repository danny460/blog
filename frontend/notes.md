# JavaScript
## Web APIs
### Window
#### Window.open()

```
window.open(url, windowName, [windowFeatures]);
```
##### Param

**url**: URL of the resource to be laoded in the browsing context. open blank page if empty.

**windowName**: specifying the name of the browsing context to load the resource into. If the name doesn't indicate an existing context, a new window is created with the `windowName`. The name should not contain any whitespace, and it will not be used as the diaplay title.

If its value is empty string or `undefined`, browser will create a new window every time (this behavior doesn't work for `null`).

**windowFeatures**: DOMString containing a comma-seperated list of [window features](#window-features) in the form "name=value".

example: `"menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";`

##### Returns
A `Window` reference to the newly created window, or `null` if window couldn't be opened.

returned reference could be used access properties and methods of the new window as long as it complies with Same-origin policy.

#### Window features

> **Note**: If the `windowFeatures` parameter is used, the features that are not listed will be disabled or removed (except titlebar and close, which are by default yes).
> All features can be set to yes or 1, or just be present without value to be on. Set them to no or 0, or in most cases just omit them, to turn feature off.

![](https://developer.mozilla.org/@api/deki/files/210/=FirefoxChromeToolbarsDescription7a.gif)

Position and size features:
- left
- top
- height
- width
- screenX
- screenY
- centerscreen
- outerHeight
- outerWidth
- innerHeight
- innerWidth
Toolbar and chrome features:
- menubar
- toolbar
- location
- personalbar
- directory
- status
Window functionality features:
- attention
- dependent
- minimizable
- fullscreen
- noopener
- resizable
- scrollbars
Features requiring privileges:

The following features require the `UniversalBrowserWrite` privilege, otherwise they will be ignored. Chrome scripts have this privilege automatically, others have to request it from the `PrivilegeManager`.

- chrome
- dialog
- modal
- titlebar
- alwaysRaised
- alwaysLowered
- z-lock: same as alwaysLowered
- close


