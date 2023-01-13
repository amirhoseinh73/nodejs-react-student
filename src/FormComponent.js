import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./styles.scss";

const defaultError = {
  name: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  acceptedRules: ""
};
const FormComponent = ({ data }) => {
  const [state, setState] = useState(data);
  const onChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const [errors, setErrors] = useState(defaultError);
  const [hasRequested, setHasRequested] = useState(false);
  const submitHandler = () => {
    // console.log("state", state);
    setErrors(defaultError);
    if (state.name.length < 3)
      setErrors({ ...errors, name: "name could not be less than 3" });
    if (state?.lastName.length < 3)
      setErrors({ ...errors, lastName: "lastName could not be less than 3" });
    if (state?.password.length < 6)
      setErrors({ ...errors, password: "password could not be less than 6" });
    if (!state?.acceptedRules)
      setErrors({ ...errors, acceptedRules: "please accept rules" });
    if (state?.password !== state.confirmPassword)
      setErrors({
        ...errors,
        confirmPassword: "confirmPassword is not equal to password"
      });

    setHasRequested(true);

    // console.log("errors", errors);
  };

  useEffect(() => {
    if (
      hasRequested &&
      !errors.name.trim() &&
      !errors.lastName.trim() &&
      !errors.password.trim() &&
      errors.acceptedRules == false &&
      !errors.confirmPassword.trim()
    )
      alert("welcome dear " + state.name);
    // else alert(Object.values(errors));
  }, [errors, hasRequested]);
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="box" md="3" controlId="validationCustom05">
          <Form.Label className="label-text">name : </Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="name"
            value={state.name}
            type="text"
            required
          />
          {errors && errors.name && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        {/* // */}
        <Form.Group className="box" md="3" controlId="validationCustom05">
          <Form.Label className="label-text">last name : </Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="lastName"
            value={state.lastName}
            type="text"
            required
          />
          {errors && errors.lastName && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        {/* // */}
        <Form.Group className="box" md="3" controlId="validationCustom05">
          <Form.Label className="label-text">password : </Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="password"
            value={state.password}
            type="password"
            required
          />
          {errors && errors.password && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        {/*  */}
        <Form.Group className="box" md="3" controlId="validationCustom05">
          <Form.Label className="label-text">confirmPassword : </Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="confirmPassword"
            value={state.confirmPassword}
            type="password"
            required
          />
          {errors && errors.confirmPassword && (
            <Form.Control.Feedback className="error-text" type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        {/*  */}
        <Form.Group className="box" md="3" controlId="validationCustom05">
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
      <Button className="button-submit" onClick={submitHandler}>
        SUBMITT
      </Button>
    </>
  );
};
export default FormComponent;
