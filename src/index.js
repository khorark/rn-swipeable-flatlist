import PropTypes from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import { FlatList, ViewPropTypes } from 'react-native';
import SwipeRow from './components/SwipeRow';

export default class SwipebleList extends PureComponent {
    static propTypes = {
        ...ViewPropTypes,
        swipeLeftDistanceActive: PropTypes.number,
        swipeRightDistanceActive: PropTypes.number,
        leftColor: PropTypes.string,
        rightColor: PropTypes.string,
        leftView: PropTypes.element,
        rightView: PropTypes.element,
        onSwipeLeft: PropTypes.func,
        onSwipeRight: PropTypes.func,
    };

    flatListRef = createRef();

    render() {
        return <FlatList ref={this.flatListRef} {...this.props} renderItem={this.renderItem} />;
    }

    renderItem = data => {
        const {
            renderItem,
            swipeDistanceActive = 0.3,
            leftColor = 'rgba(146, 149, 181, 0.7)',
            rightColor = 'rgba(132, 147, 158, 0.7)',
            leftView = null,
            rightView = null,
            onSwipeLeft,
            onSwipeRight,
        } = this.props;

        return (
            <SwipeRow
                refList={this.flatListRef}
                item={data.item}
                swipeDistanceActive={swipeDistanceActive}
                leftColor={leftColor}
                rightColor={rightColor}
                leftView={leftView}
                rightView={rightView}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            >
                {renderItem(data)}
            </SwipeRow>
        );
    };
}
