import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <div className="lds-css ng-scope">
        <div
          style={{ width: 100 + "%", height: 100 + "%" }}
          className="lds-double-ring"
        >
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
