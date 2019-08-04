import React, { PureComponent } from 'react';
import { Animated, Dimensions, LayoutAnimation, PanResponder, StyleSheet, View } from 'react-native';

export default class SwipeRow extends PureComponent {
    constructor(props) {
        super(props);
        const { width } = Dimensions.get('window');
        this.width = width;
        this.durationAnimated = props.duration;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderTerminate: this.onPanResponderTerminate,
            onShouldBlockNativeResponder: () => false,
        });

        this.state = {
            opacity: 1,
            translateX: new Animated.Value(0),
        };
    }

    render() {
        const { children, leftColor, rightColor, leftView, rightView } = this.props;
        const { opacity, translateX } = this.state;

        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity,
                        transform: [{ translateX }],
                    },
                ]}
                {...this.panResponder.panHandlers}
            >
                <View
                    style={[
                        styles.swipeArea,
                        {
                            width: this.width,
                            left: -this.width,
                            alignItems: 'flex-end',
                            backgroundColor: leftColor,
                        },
                    ]}
                    pointerEvents={'none'}
                >
                    {leftView}
                </View>
                {children}
                <View
                    style={[
                        styles.swipeArea,
                        {
                            width: this.width,
                            right: -this.width,
                            backgroundColor: rightColor,
                        },
                    ]}
                    pointerEvents={'none'}
                >
                    {rightView}
                </View>
            </Animated.View>
        );
    }

    onPanResponderMove = (e, { dx }) => {
        if (Math.abs(dx) > 0 && Math.abs(dx) < 50) {
            this.toggleStatusScroll(false);
        }
        this.state.translateX.setValue(dx);
    };

    onPanResponderTerminate = () => {
        Animated.timing(this.state.translateX, {
            toValue: 0,
            duration: this.durationAnimated,
            useNativeDriver: true,
        }).start();

        this.toggleStatusScroll(true);
    };

    onPanResponderRelease = (e, { dx }) => {
        const { swipeDistanceActive } = this.props;

        if (Math.abs(dx) > this.width * swipeDistanceActive) {
            if (dx > 0) {
                Animated.timing(this.state.translateX, {
                    toValue: this.width,
                    duration: this.durationAnimated,
                    useNativeDriver: true,
                }).start(() => {
                    this.setState({ opacity: 0 });
                    this.props.onSwipeRight && this.props.onSwipeRight(this.props.item);
                });
            } else {
                Animated.timing(this.state.translateX, {
                    toValue: -this.width,
                    duration: this.durationAnimated,
                    useNativeDriver: true,
                }).start(() => {
                    this.setState({ opacity: 0 });
                    this.props.onSwipeLeft && this.props.onSwipeLeft(this.props.item);
                });
            }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        } else {
            Animated.timing(this.state.translateX, {
                toValue: 0,
                duration: this.durationAnimated,
                useNativeDriver: true,
            }).start();
        }

        this.toggleStatusScroll(true);
    };

    toggleStatusScroll = scrollEnabled => {
        this.props.refList.current &&
            this.props.refList.current.getScrollResponder().setNativeProps({
                scrollEnabled,
            });
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    swipeArea: {
        paddingHorizontal: 25,
        justifyContent: 'center',
        height: '100%',
        position: 'absolute',
    },
});
