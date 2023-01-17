import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validateEmail } from "../helpers/validations";
import { STATES } from "../helpers/states";
import { requestPost } from "../helpers/fetch";
import { createUserRoute } from "../helpers/routes";

const inputFields = {
  firstName: "",
  lastName: "",
  email: "",
  state: "",
  address: "",
}

const defaultData = {
  ...inputFields,
  acceptedRules: false
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
    setErrors({...defaultError})

    const formErrors = {...defaultError}
    if (state.firstName.length < 3) formErrors.firstName = "firstName could not be less than 3 characters"
    if (state.lastName.length < 3) formErrors.lastName = "lastName could not be less than 3 characters"
    if (!validateEmail(state.email)) formErrors.email = "email format not correct"
    if (state.state.length < 2) formErrors.state = "please choose your state"
    if (state.address.length < 5 ) formErrors.address = "address could not be less than 5 characters"
    if (!state.acceptedRules) formErrors.acceptedRules = "please accept rules"

    setErrors(formErrors)

    setHasRequested(true);
  };

  useEffect( () => {
    if (
        !hasRequested ||
        errors.firstName.trim() ||
        errors.lastName.trim() ||
        errors.email.trim() ||
        errors.state.trim() ||
        errors.address.trim() ||
        errors.acceptedRules
      ) return setHasRequested(false)
    
    const callback = () => {
      alert(`thank you for your register dear ${state.firstName} ${state.lastName}`);
      setState(defaultData)
    }

    requestPost( createUserRoute, callback, state )

  }, [errors, hasRequested]);


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
