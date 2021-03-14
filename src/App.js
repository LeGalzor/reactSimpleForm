import React from "react";
import _ from "lodash/fp";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./styles.css";

const url = 'https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api/data'

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
  'x-api-key': 'VXUsgQ2jsq3EM30icjHA91tETkqFwtXDak07xebM' },
};

function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(data));
    const newBody = {
      name: data.firstName,
      company_name: data.companyName,
      email: data.email,
      phone: data.phone
    }
    requestOptions.body = JSON.stringify(newBody);
    fetch(url, requestOptions, {mode: "no-cors"})
    .then(response => response.json())
    .then(data => console.log(data));
  };

  return (
    <div className="app-container">
    <div className="purple-square"></div>
      <div className="remote-container">
      <div className="remote-title">
      <h2 id="remote-title">
        The Future of Work in the now: Why you should Become Remote-ready
        </h2>
        Infographic
        <small id="content">
        The results are in, and the verdict? Remote is here to stay. Thanks to a global pandemic companies have had to reevaluate the power of distributed workforces and we’ve put together all the reasons why going remote is the right move to make. In this infographics, you’ll see: 
        <br></br>
        <br></br>
        • How remote work broadens the talent pool 
        <br></br>
        • The productivity results behind distributed teams 
        <br></br>
        • An increase in diversity as a result of remote recruitment 
        <br></br>
        • Money saved on operational costs and salary negotiations
        <br></br>
        <br></br>
         What better time to refresh your strategy than on the brink of a whole new world?
         Dig into this list of recruiting methodologies and adjust your sails for the future!
        </small>
      </div>
      </div>
      <div className="orange-rect"></div>
      <form className="master-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title-container">
          <h2>Want to get the full version?</h2>
          <h4>Fill in the form Below:</h4>
        </div>
        <input
          name="firstName"
          placeholder="Full name"
          ref={register({
            required: true,
            maxLength: 20,
            pattern: /^[a-z ,.'-]+$/i
          })}
        />
        {_.get("firstName.type", errors) === "required" && (
          <p>This field is required</p>
        )}
        {_.get("firstName.type", errors) === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {_.get("firstName.type", errors) === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <input
          placeholder="Company Name"
          name="companyName"
          ref={register({
            pattern: /^[A-Za-z]+$/i
          })}
        />
        {_.get("companyName.type", errors) === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <input
          name="phone"
          placeholder="Phone"
          type="number"
          ref={register({
            pattern: /[0-9]{3}[0-9]{3}[0-9]{4}/i
          })}
        />
        {_.get("phone.type", errors) === "pattern" && (
          <p>Phone number is not in a xxx-xxx-xxxx pattern</p>
        )}
        <input
          name="email"
          placeholder="Work Email"
          type="email"
          ref={register({
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
          })}
        />
        {_.get("email.type", errors) === "pattern" && (
          <p>Email is not in a xxxx@xxx.xxx pattern</p>
        )}
        <input type="submit"></input>
        <div className="checkbox-container">
          <input className="checkbox" type="checkbox" name="checkbox" ref={register({
            required: true
          })} />
          <h6>
            I agree to the privacy policy including for Joonko to use my contact
            details to contact me for marketing purposes.
          </h6>
        </div>
      </form>
      <div className="green-plus"></div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
