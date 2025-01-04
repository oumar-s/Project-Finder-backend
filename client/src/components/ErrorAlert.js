import React from "react";

function ErrorAlert({ details }) {
  return (
    <div className="d-flex justify-content-center text-center">
      <div className="text-red-600" role={"alert"}>
        <strong>An error occurred.</strong> <br/> {details || ""}
      </div>
    </div>
  );
}

export default ErrorAlert;