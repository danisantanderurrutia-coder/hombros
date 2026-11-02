import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '50px auto', background: '#fff', border: '2px solid #ef4444', borderRadius: '16px', color: '#1c1917' }}>
          <h2 style={{ color: '#be123c', fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            ⚠️ Error de renderizado detectado
          </h2>
          <p style={{ fontSize: '13px', color: '#444', marginBottom: '15px' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', background: '#059669', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Recargar aplicación
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
