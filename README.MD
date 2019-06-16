# React Native Swipeable FlatList [![NPM version][npm-image]][npm-url]

A simple and fast React Native swipeble flatlist component. Supports both iOS and Android.

<img src="https://raw.githubusercontent.com/khorark/react-native-swipeable-flatlist/master/demo.gif" width="400">

## Installation

```sh
npm i --save @khorark/react-native-swipeable-flatlist
```

## Usage

```javascript
import SwipebleList from '@khorark/react-native-swipeable-flatlist';

function MyListItem() {
    return (
        <View>
            <SwipebleList
                data={[1, 2, 3]}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                leftColor={'green'}
                rightColor={'blue'}
                onSwipeLeft={this.onSwipe}
                onSwipeRight={this.onSwipe}
            />
        </View>
    );
}
```

### Props

| prop                  | type       | default                  | description                                                          |
| --------------------- | ---------- | ------------------------ | -------------------------------------------------------------------- |
| `swipeDistanceActive` | integer    | 0.3                      | swipeable distance for active swipe                                  |
| `leftView`            | renderable | `null`                   | (optional) left content visible during pull action                   |
| `rightView`           | renderable | `null`                   | (optional) right content visible during pull action                  |
| `leftColor`           | string     | rgba(146, 149, 181, 0.7) | (optional) background color for left content                         |
| `rightColor`          | string     | rgba(132, 147, 158, 0.7) | (optional) background color for left content                         |
| `onSwipeLeft`         | function   | `null`                   | (optional) user has swiped beyond `swipeDistanceActive` and released |
| `onSwipeRight`        | function   | `null`                   | (optional) user has swiped beyond `swipeDistanceActive` and released |

## Example

## License

MIT

[npm-image]: https://badge.fury.io/js/react-native-swipeable.svg
[npm-url]: https://npmjs.org/package/react-native-swipeable
