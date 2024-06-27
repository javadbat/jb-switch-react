import React, { useEffect, useRef, useState, useImperativeHandle, useCallback, } from 'react';
import 'jb-switch';
// eslint-disable-next-line no-duplicate-imports
import { JBSwitchWebComponent } from 'jb-switch';
import { useEvent } from '../../../common/hooks/use-event';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-switch': JBSwitchType;
        }
        interface JBSwitchType extends React.DetailedHTMLProps<React.HTMLAttributes<JBSwitchWebComponent>, JBSwitchWebComponent> {
            class?: string,
            name?: string,
            "true-title"?: string,
            "false-title"?: string,
        }
    }
}
export type JBSwitchEventType<T> = T & {
    target: JBSwitchWebComponent
}
export type JBSwitchProps = {
    style?: string,
    name?: string,
    className?: string,
    onChange?: (e: JBSwitchEventType<Event>) => void,
    value: boolean | null | undefined,
    trueTitle: string | null | undefined,
    falseTitle: string | null | undefined,
    isLoading: boolean | null | undefined,
}

export const JBSwitch = React.forwardRef((props: JBSwitchProps, ref) => {
    const element = useRef<JBSwitchWebComponent>(null);
    const [refChangeCount, refChangeCountSetter] = useState(0);
    useImperativeHandle(
        ref,
        () => (element ? element.current : {}),
        [element],
    );
    useEffect(() => {
        refChangeCountSetter(refChangeCount + 1);
    }, [element.current]);
    const onchange = useCallback((e: JBSwitchEventType<Event>) => {
        if(props.value !== undefined && props.value !==null){
            e.preventDefault();
        }
        if (typeof props.onChange == "function") {
            props.onChange(e);
        }
    }, [props.onChange,props.value]);
    useEvent(element.current, 'before-change', onchange, true);
    // useEvent(element.current, 'change', onchange, true);

    useEffect(() => {
        if (element.current && props.isLoading !== undefined && props.isLoading !==null && typeof props.isLoading == "boolean") {
            element.current.isLoading = props.isLoading;
        }
    }, [props.isLoading]);
    useEffect(() => {
        if (element.current && props.value !== null && props.value !== undefined) {
            element.current.value = props.value;
        }
    }, [props.value]);

    useEffect(() => {
        if (element.current && typeof props.style == "string") {
            element.current.setAttribute("style", props.style);
        }
    }, [props.style]);
    return (
        <jb-switch class={props.className ? props.className : ""} name={props.name} true-title={props.trueTitle ? props.trueTitle : ''} false-title={props.falseTitle ? props.falseTitle : ''} ref={element}>
        </jb-switch>
    );
});

JBSwitch.displayName = "JBSwitch";
