import React from 'react';
import { FlatListProps } from 'react-native';

export interface SwipebleListProperties extends FlatListProps {
    swipeDistanceActive?: number;
    leftColor?: string;
    rightColor?: string;
    leftView?: Element;
    rightView?: Element;
    onSwipeLeft: (item: unknown) => void;
    onSwipeRight: (item: unknown) => void;
}

interface SwipebleList extends React.ComponentClass<SwipebleListProperties> {}

declare const SwipebleList: SwipebleList;

export default SwipebleList;
