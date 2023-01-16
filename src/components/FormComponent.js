import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validateEmail } from "../helpers/validations";
import { STATES } from "../helpers/states";

const inputFields = {
  firstName: "",
  lastName: "",
  email: "",
  state: "",
  address: "",
}

const defaultData = {
  ...inputFields,
  acceptedRules: true
}

const defaultError = {
  ...inputFields,
  acceptedRules: ""
};

const FormComponent = () => {
  const [state, setState] = useState(defaultData);
  const [errors, setErrors] = useState(defaultError);
  const [hasRequested, setHasRequested] = useState(false);
  
  const setStateByKeyValue = (key, value) => setState({ ...state, [key]: value })
  const onChangeHandler = (event) => setStateByKeyValue(event.target.name, event.target.value)

  const submitHandler = () => {
    // setErrors(defaultError)

    if (state.firstName.length < 3) setErrors({ ...errors, firstName: "firstName could not be less than 3 characters" });
    if (state.lastName.length < 3) setErrors({ ...errors, lastName: "lastName could not be less than 3 characters" });
    if (!validateEmail(state.email)) setErrors({ ...errors, email: "email format not correct" });
    if (state.state.length < 2) setErrors({ ...errors, state: "please choose your state" });
    if (state?.address.length < 5 ) setErrors({ ...errors, state: "address could not be less than 5 characters" });
    if (!state.acceptedRules) setErrors({ ...errors, acceptedRules: "please accept rules" });

    setHasRequested(true);
  };

  useEffect(() => {
    if (
      hasRequested &&
      !errors.firstName.trim() &&
      !errors.lastName.trim() &&
      !errors.email.trim() &&
      !errors.state.trim() &&
      !errors.address.trim() &&
      !errors.acceptedRules
    )
    alert("welcome dear " + state.firstName);
  }, []);


  return (
    <>
      <Form className="form-center">
        <Form.Group className="inputbox" md="3" controlId="validationFirstName">
          <Form.Label className="label-text">Firstname : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={onChangeHandler}
            value={state.firstName}
            name="firstName"
            type="text"
            required
          />
          {errors && errors.firstName && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="inputbox" md="3" controlId="validationLastName">
          <Form.Label className="label-text">Lastname : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={onChangeHandler}
            value={state.lastName}
            name="lastName"
            type="text"
            required
          />
          {errors && errors.lastName && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="inputbox" md="3" controlId="validationEmail">
          <Form.Label className="label-text">Email : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={onChangeHandler}
            value={state.email}
            name="email"
            type="text"
            required
          />
          {errors && errors.email && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="inputbox" md="3" controlId="validationState">
          <Form.Label className="label-text">State : </Form.Label>
          <Form.Select
            className="flex-input"
            onChange={onChangeHandler}
            value={state.state}
            name="state"
            required
          >
            <option value="">choose</option>
            {
              STATES.map(state => {
                return (
                  <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                )
              })
            }
          </Form.Select>
          {errors && errors.state && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="inputbox" md="3" controlId="validationAddress">
          <Form.Label className="label-text">Address : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={onChangeHandler}
            value={state.address}
            name="address"
            type="text"
          />
          {errors && errors.address && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        
        <Form.Group className="checkbox" md="3" controlId="validationAcceptRules">
          <Form.Label className="label-text">accept rules</Form.Label>
          <Form.Control
            onChange={(e) =>
              setState({ ...state, acceptedRules: e.target.checked })
            }
            name="name"
            checked={state.acceptedRules}
            type="checkBox"
            required
          />
          {errors && errors.acceptedRules && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.acceptedRules}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
      <Button className="btn-submit" type="submit" onClick={submitHandler}>
        SUBMIT
      </Button>
    </>
  );
};
export default FormComponent;
