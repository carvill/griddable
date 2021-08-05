import React from 'react';
import PropTypes from 'prop-types';

export interface UglyButtonProps {
    label: string;
    backgroundColor?: string;
    onClick(): any;
}

const UglyButton = (props: UglyButtonProps) => {
    return (
        <button onClick={props.onClick} style={props.backgroundColor ? { backgroundColor: props.backgroundColor } : undefined}>
            {props.label}
        </button>
    );
}

UglyButton.propTypes = {
    label: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
};

UglyButton.defaultProps = {
    backgroundColor: null,
    onClick: undefined,
};

export default UglyButton;