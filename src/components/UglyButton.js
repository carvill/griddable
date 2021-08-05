import React from 'react';
import PropTypes from 'prop-types';

export default function UglyButton({ label, backgroundColor, onClick }) {
    return (
        <button onClick={onClick}
            style={backgroundColor && { backgroundColor }}>
            {label}
        </button>
    );
}

UglyButton.propTypes = {
    backgroundColor: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

UglyButton.defaultProps = {
    backgroundColor: null,
    onClick: undefined,
};