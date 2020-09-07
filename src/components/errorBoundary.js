import React from 'react'
import Alert from '@material-ui/lab/Alert'

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {

    this.setState({hasError: true})
  }

  render() {

    if (this.state.hasError) {
      
      return <Alert severity="error">Something has gone awfully, terribly wrong!</Alert>
    }

    return this.props.children
  }

}

export default ErrorBoundary