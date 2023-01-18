import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validateEmail } from "../helpers/validations";
import { STATES } from "../helpers/states";
import { requestPost } from "../helpers/fetch";
import { createUserRoute } from "../helpers/routes";

const inputFields = {
  firstname: "",
  lastname: "",
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

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors({...defaultError})

    const formErrors = {...defaultError}
    if (state.firstname.length < 3) formErrors.firstname = "firstname could not be less than 3 characters"
    if (state.lastname.length < 3) formErrors.lastname = "lastname could not be less than 3 characters"
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
        errors.firstname.trim() ||
        errors.lastname.trim() ||
        errors.email.trim() ||
        errors.state.trim() ||
        errors.address.trim() ||
        errors.acceptedRules
      ) return setHasRequested(false)
    
    const callback = (respond) => {
      if ( Number(respond.status) === 201 ) {
        alert(`thank you for your register dear ${state.firstname} ${state.lastname}`);
        setState(defaultData)
      } else {
        alert(respond.message)
      }
    }

    requestPost( createUserRoute, callback, state )

  }, [errors, hasRequested]);

  return (
    <>
      <Form className="form-center" onSubmit={submitHandler}>
        <Form.Group className="inputbox" md="3" controlId="validationFirstName">
          <Form.Label className="label-text">Firstname : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={onChangeHandler}
            value={state.firstname}
            name="firstname"
            type="text"
            required
          />
          {errors && errors.firstname && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="inputbox" md="3" controlId="validationLastName">
          <Form.Label className="label-text">Lastname : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={onChangeHandler}
            value={state.lastname}
            name="lastname"
            type="text"
            required
          />
          {errors && errors.lastname && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.lastname}
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

        <Button className="btn-submit" type="submit">
          SUBMIT
        </Button>
      </Form>
    </>
  );
};
export default FormComponent;
