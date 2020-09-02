import React, {useRef} from 'react'
import PropTypes from 'prop-types';
import './JBSwitch.scss';
function JBSwitch(props) {
    const element = useRef();
    const callOnChange = (value)=>{
        var event = new CustomEvent("change",{
            detail: {
                oldValue:props.value,
                newValue:value
			},
			bubbles: true,
			cancelable: true
        });
        event.simulated = true;
        let tracker = element.current._valueTracker;
        if (tracker) {
            tracker.setValue(value);
        }
        element.current.value = value;
        element.current.onchange = (e)=>props.onChange(e);
        element.current.dispatchEvent(event);
    }
    const onClick = (e)=>{
        var newValue = !this.config.value;
        callOnChange(newValue)
    }
    return (
        <div>
            <div className="jb-switch-component-wrapper" ref={element}>
                <div className={"caption " + (props.value ? 'active' : '')}>{props.trueTitle ? props.trueTitle : ''}</div>
                <div className="svg-wrapper" onClick={onClick}>
                    <svg className={"switch-svg " + (props.value ? 'active' : '')} viewBox="0 0 710 440">
                        <defs>
                            <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="7"></feGaussianBlur><feOffset dx="0" dy="0" result="offsetblur"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.9"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
                            <radialGradient id="color1" cx="50%" cy="50%" r="75%" >
                                <stop offset="0%" style={{ stopColor: "rgb(255,255,255)", stopOpacity: "1" }} />
                                <stop offset="99%" style={{ stopColor: "rgb(224,224,224)", stopOpacity: "1" }} />
                                <stop offset="100%" style={{ stopColor: "rgb(224,224,224)", stopOpacity: "1" }} />
                            </radialGradient>
                        </defs>
                        <rect className="bg-bar" x="20" y="40" height="360" width="680" stroke="red" rx="180" strokeWidth="0" />
                        <circle className="trigger-circle" fill="url(#color1)" cx="220" cy="220" r="200" filter="url(#dropshadow)" />
                        <circle className={"trigger-circle-bar " + (props.isLoading ? 'loading' : '')} cx="220" cy="220" r="120" filter="url(#dropshadow)" />
                    </svg>
                </div>
                <div className={"caption " + (!props.value ? 'active' : '')}>{props.falseTitle ? props.falseTitle : ''}</div>
            </div>
        </div>
    )
}
JBSwitch.propTypes = {
    value:PropTypes.bool.isRequired,
    onChange:PropTypes.func,
    trueTitle:PropTypes.string,
    falseTitle:PropTypes.string,
    isLoading: PropTypes.bool
}
export default JBSwitch
