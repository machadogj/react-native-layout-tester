import { Component, PropTypes, createElement } from 'react';

import hoistStatics from 'hoist-non-react-statics';

const defaultMapLayoutToProps = layout => layout;
const mergeProps = (contextProps, props) => ({
    ...contextProps,
    ...props
});

const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function getLayout(mapLayoutToProps = defaultMapLayoutToProps, options = {}) {
    return WrappedComponent => {

        class GetLayout extends Component {
            static displayName = `GetLayout(${getDisplayName(WrappedComponent)})`;

            static contextTypes = {
                layoutTesterState: PropTypes.object.isRequired,
                subscribeLayout: PropTypes.func
            };

            state = this.context.layoutTesterState;
            mergedProps = mergeProps(mapLayoutToProps(this.state), this.props);

            componentWillReceiveProps(nextProps, nextContext) {
                let { layoutTesterState: state } = nextContext;
                if (!this.unsubscribe && state) {
                    this.mergedProps = mergeProps(mapLayoutToProps(state), nextProps);
                } else {
                    this.mergedProps = mergeProps(this.mergedProps, nextProps);
                }
            }

            componentDidMount() {
                let { subscribeLayout: subscribe } = this.context;
                if (!this.unsubscribe && subscribe) {
                    this.unsubscribe = subscribe(state => {
                        this.mergedProps = mergeProps(mapLayoutToProps(state), this.props);
                        this.setState(state);
                    });
                }
            }

            componentWillUnmount() {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.mergedProps = null;
                }
            }

            render() {
                const renderProps = options.withRef ?
                    { ...this.mergedProps, ref: 'wrapInstance' } :
                    this.mergedProps;
                return createElement(WrappedComponent, renderProps);
            }
        }

        return hoistStatics(GetLayout, WrappedComponent)
    };
};
