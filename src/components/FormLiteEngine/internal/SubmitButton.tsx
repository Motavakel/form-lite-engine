import React from 'react';
import { Button, Col, Row } from 'antd';
import type { LoadingAnimationType } from '../types';

interface SubmitButtonProps {
  isSubmitting: boolean;
  submitLabel: React.ReactNode;
  loadingStrategy?: {
    type?: LoadingAnimationType;
    customLoader?: React.ReactNode;
  };
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  submitLabel,
  loadingStrategy = { type: 'spinner' },
}) => {
  const renderContent = () => {
    if (!isSubmitting) return submitLabel;
    if (loadingStrategy.customLoader) return loadingStrategy.customLoader;

    switch (loadingStrategy.type) {
      case 'dots': return <span className="loader-dots">...</span>;
      case 'pulse': return <span className="loader-pulse">{submitLabel}</span>;
      default: return submitLabel;
    }
  };

  return (
    <>
      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting && loadingStrategy.type === 'spinner'}
            disabled={isSubmitting}
            className={isSubmitting ? `loading-${loadingStrategy.type}` : ''}
          >
            {renderContent()}
          </Button>
        </Col>
      </Row>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .loading-pulse { animation: pulse 1s infinite ease-in-out; }
        .loader-dots:after {
          content: ' .';
          animation: dots 1.5s steps(5, end) infinite;
        }
        @keyframes dots {
          0%, 20% { content: ' .'; }
          40% { content: ' ..'; }
          60% { content: ' ...'; }
          80%, 100% { content: ''; }
        }
      `}</style>
    </>
  );
};