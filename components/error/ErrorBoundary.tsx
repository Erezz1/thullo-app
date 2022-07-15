import React from 'react';

type Props = {
    children: React.ReactNode;
}

type State = {
    hasError: boolean;
    message: string;
}

class ErrorBoundary extends React.Component<Props, State> {

    state = {
        hasError: false,
        message: '',
    }

    static getDerivedStateFromError( error: any ) {
        return {
            hasError: true,
            message: error.message,
        };
    }

    componentDidCatch( error: any ) {
        console.error( error.message );
    }

    render() {
        if ( this.state.hasError ) {
            return <div>Error: { this.state.message }</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
