import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <label htmlFor={name} className="input-group-text">
            {label}
          </label>
        </div>
        <select {...rest} name={name} id={name} className="custom-select">
          <option value="">Choose...</option>
          {options.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
