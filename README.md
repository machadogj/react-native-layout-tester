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

## Known Issues

- Doesn't play well with styles generated based on `Dimensions` (physical device dimensions).

## TODO

- Haven't yet tested it in Android
- Receive possible viewport sizes through props

## LICENSE
The MIT License (MIT)

Copyright (c) 2015 Gustavo Machado (machadogj@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.