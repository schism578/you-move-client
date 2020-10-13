import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <h2>Could not complete task</h2>
          );
        }
        return this.props.children;
    }  
}

ErrorBoundary.propTypes = {
  children: PropTypes.object
}