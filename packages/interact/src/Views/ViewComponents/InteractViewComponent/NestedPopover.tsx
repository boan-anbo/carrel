import './NestedPopover.css'
import React, {cloneElement, useMemo, useState} from "react";
import {
    Placement,
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useRole,
    useDismiss,
    useId,
    useClick,
    FloatingFocusManager,
    FloatingPortal,
    useFloatingNodeId,
    FloatingNode,
    FloatingTree,
    useFloatingParentNodeId
} from "@floating-ui/react-dom-interactions";
import {mergeRefs} from "react-merge-refs";

interface Props {
    render: (data: {
        close: () => void;
        labelId: string;
        descriptionId: string;
    }) => React.ReactNode;
    placement?: Placement;
    children: JSX.Element;
    open:boolean;
}

const Popover = ({children, render, placement, open}: Props) => {



    const nodeId = useFloatingNodeId();

    const {x, y, reference, floating, strategy, context} = useFloating({
        open,
        middleware: [offset(5), flip(), shift()],
        placement,
        nodeId,
        whileElementsMounted: autoUpdate
    });

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const {getReferenceProps, getFloatingProps} = useInteractions([
        // Whether allow click to change open status
        // useClick(context),
        useRole(context),
        useDismiss(context)
    ]);

    // Preserve the consumer's ref
    const ref = useMemo(() => mergeRefs([reference, (children as any).ref]), [
        reference,
        children
    ]);

    return (
        <FloatingNode id={nodeId}>
            {cloneElement(children, getReferenceProps({ref, ...children.props}))}
            <FloatingPortal>
                {open && (
                    <FloatingFocusManager context={context}>
                        <div
                            ref={floating}
                            className="Popover"
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0
                            }}
                            aria-labelledby={labelId}
                            aria-describedby={descriptionId}
                            {...getFloatingProps()}
                        >
                            {render({
                                labelId,
                                descriptionId,
                                close: () => {
                                    // on close
                                }
                            })}
                        </div>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </FloatingNode>
    );
};

export const NestedPopover: React.FC<Props> = (props) => {
    const parentId = useFloatingParentNodeId();

    if (parentId == null) {
        return (
            <FloatingTree>
                <Popover  {...props} />
            </FloatingTree>
        );
    }

    return <Popover {...props} />;
};
