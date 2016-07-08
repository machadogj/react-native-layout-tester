import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import shallowEqual from 'shallowequal';
import LayoutProvider, { getLayout } from 'react-native-layout-provider';
import styles from "./styles";

export { getLayout }

export default class LayoutTester extends Component {

    static displayName = "LayoutTester";

    static propTypes = {
        children: PropTypes.node,
        config: PropTypes.object,
        noTestWrapConfig: PropTypes.shape({
            mode: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            portrait: PropTypes.bool,
        }),
        viewportChanged: PropTypes.func
    };

    static defaultProps = {
        config: {
            iphone5: {
                label: "iPhone 5",
                width: 320,
                height: 568
            },
            iphone6: {
                label: "iPhone 6",
                width: 375,
                height: 667
            },
            iphone6plus: {
                label: "iPhone 6+",
                width: 414,
                height: 736
            }
        }
    };

    constructor(props) {
        super(props);
        if (props.noTestWrapConfig) {
            let deviceDimensions = Dimensions.get("window");
            let { mode, width, height, portrait } = props.noTestWrapConfig;
            if (!mode) mode = 'default';
            if (!width) width = deviceDimensions.width;
            if (!height) height = deviceDimensions.height;
            portrait = width <= height;
            this.state = {
                mode,
                viewport: { width, height },
                portrait: portrait
            };
        } else {
            this.state = { portrait: true };
        }
    }

    componentWillReceiveProps(nextProps) {
        if (shallowEqual(this.props.noTestWrapConfig, nextProps.noTestWrapConfig)) return;

        if (!nextProps.noTestWrapConfig) {
            let config = this.props.config;
            let mode = Object.keys(config)[0];
            this.setDefaultConfig(mode, config[mode]);
            return;
        }

        let { mode, width, height, portrait } = nextProps.noTestWrapConfig;
        this.setDefaultConfig(mode, {
            width,
            height,
            portrait
        });
    }

    componentWillMount() {
        if (this.props.noTestWrapConfig) return;

        let config = this.props.config;
        let mode = Object.keys(config)[0];
        this.setDefaultConfig(mode, config[mode]);
    }

    setDefaultConfig(mode, config) {
        let newState = {
            mode: mode,
            viewport: {
                height: config.height,
                width: config.width
            },
            portrait: config.portrait || this.state.portrait
        };
        this.setState(newState);
    }

    handleSelection(mode, portrait) {
        if (this.state.mode === mode && this.state.portrait === portrait) {
            return;
        }
        let { height, width } = this.props.config[mode];
        let viewport = portrait ? { height, width } : { height: width, width: height };
        let newState = {
            mode,
            viewport,
            portrait
        };
        this.setState(newState, () => {
            if (this.props.viewportChanged) {
                this.props.viewportChanged(newState);
            }
        });
    }

    handleRotate() {
        this.handleSelection(this.state.mode, !this.state.portrait);
    }

    renderButton(mode) {
        let deviceSize = this.props.config[mode];
        let selected = this.state.mode === mode ? styles.selectedButton : {};
        return (
            <TouchableOpacity onPress={ ()=> this.handleSelection(mode, this.state.portrait) }>
                <Text style={ [ styles.button, selected ] }>{ `${this.props.config[mode].label}` }</Text>
            </TouchableOpacity>
        );
    }

    renderLayoutTester() {
        let { viewport } = this.state;
        let buttons = Object.keys(this.props.config).map(k => {
            return (
                <View key={ k }>
                    { this.renderButton(k) }
                </View>
            );
        });
        return (
            <View style={ [ styles.container ] }>
                <View style={ styles.buttons }>
                    { buttons }
                </View>
                <View style={ styles.body }>
                    <View style={ [ styles.viewport, viewport ] }>
                        { this.props.children }
                    </View>
                    <Text style={ styles.subTitle }>{ `(${viewport.width}x${viewport.height})` }</Text>
                </View>
                <View style={ styles.buttons }>
                    <TouchableOpacity onPress={ () => this.handleRotate() }>
                        <Text style={ styles.button }>Rotate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        let children;
        if (this.props.noTestWrapConfig) {
            children = this.props.children;
        } else {
            children = this.renderLayoutTester();
        }
        return (
            <LayoutProvider
                label={ this.state.mode }
                width={ this.state.viewport.width }
                height={ this.state.viewport.height }
                portrait={this.state.portrait }
            >
                { children }
            </LayoutProvider>
        );
    }
}
