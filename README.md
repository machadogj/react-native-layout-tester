#react-native-layout-tester

Use an iPad to test your component's layout in different iPhone sizes.

![Layout Tester](https://raw.githubusercontent.com/machadogj/react-native-layout-tester/master/layout-tester-sample.gif)


## Installation

```
npm install --save react-native-layout-tester
```

## Usage

In order to test your entire app, first wrap your app in the LayoutTester (works with redux and Navigator as well).

```
import LayoutTester from "react-native-layout-tester";
    
    //...

    render() {
        return (
            <LayoutTester>
                <Provider store={ store }>
                    <Router
                        initialRoute={ this._initialRoute }
                        ref={ this._setRouter }
                    />
                </Provider>
            </LayoutTester>
        );
    }
```

Then run you application in the iPad Air simulator (it has enough width to accomodate an iPhone 6+ logical resolution in landscape mode). In order to accomplish this, you will have to set up your xcode solution to "Universal".

![xcode universal](https://raw.githubusercontent.com/machadogj/react-native-layout-tester/master/xcode-universal.png)

NOTICE: You won't need this package in your production bundle, so you can exclude this package by simply not importing it in any file.

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| viewportChanged | `undefined` |`func` | Callback triggered when the viewport changes, either by changing device or rotating. |
| config | `undefined` |`object` | Device screens configuration. |

### config (prop)

You can pass whatever device screen sizes you need (useful for android sizes).

```
    // these are not real measure!!!!

    render() {
        return (
            <LayoutTester
                config={
                    {
                        nexus4: {
                            label: "Nexus 4",
                            width: 364,
                            height: 640
                        },
                        motog: {
                            label: "Moto G",
                            width: 396,
                            height: 640
                        }
                    }
                }
            >
                <Provider store={ store }>
                    <Router
                        initialRoute={ this._initialRoute }
                        ref={ this._setRouter }
                    />
                </Provider>
            </LayoutTester>
        );
    }
```


## Known Issues

- Doesn't play well with styles generated based on `Dimensions` (physical device dimensions).

## TODO

- Haven't yet tested it in Android