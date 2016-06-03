import React, {
    Component,
    PropTypes,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import styles from "./styles";

let config = {
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
};

export default class LayoutTester extends Component {

    static displayName = "LayoutTester";

    static propTypes = {
        children: PropTypes.node,
        viewportChanged: PropTypes.func
    };

    state = {
        mode: "iphone6",
        portrait: true,
        viewport: {
            height: config["iphone6"].height,
            width: config["iphone6"].width
        }
    };

    handleSelection(mode, portrait) {
        if (this.state.mode === mode && this.state.portrait === portrait) {
            return;
        }
        let { height, width } = config[mode];
        let viewport = portrait ? { height, width } : { height : width, width  : height };
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
        let deviceSize = config[mode];
        let selected = this.state.mode === mode ? styles.selectedButton : {};
        return (
            <TouchableOpacity onPress={ ()=> this.handleSelection(mode, this.state.portrait) }>
                <Text style={ [ styles.button, selected ] }>{ `${config[mode].label}\n(${deviceSize.width}x${deviceSize.height})` }</Text>
            </TouchableOpacity>
        );
    }

    render() {
        let { viewport } = this.state;
        
        return (
            <View style={ [ styles.container ] }>
                <View style={ styles.buttons }>
                    { this.renderButton("iphone5") }
                    { this.renderButton("iphone6") }
                    { this.renderButton("iphone6plus") }
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
}
