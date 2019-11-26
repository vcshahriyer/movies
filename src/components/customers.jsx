import React from "react";
import customers from "../services/fakeUserService";

const Customers = props => {
  return (
    <div className="row">
      {customers.map(customer => (
        <div className="col-4">
          <div className="card my-2" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={require(`../assets/customers/${customer.image}`)}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 class="card-title">{customer.username}</h5>
              <span>Phone: {customer.phone}</span>
              <p className="card-text">{customer.company.catchPhrase}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customers;
