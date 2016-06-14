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
                layoutTesterState: PropTypes.object.isRequired
            };

            mergedProps = mergeProps(mapLayoutToProps(this.context.layoutTesterState), this.props);

            componentWillReceiveProps(nextProps, nextContext) {
                this.mergedProps = mergeProps(mapLayoutToProps(nextContext.layoutTesterState), nextProps);
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
