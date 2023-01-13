import FormComponent from "./FormComponent";
import "./styles.scss";

export default function App() {
  const fakeData = {
    name: "ali",
    lastName: "alavi",
    password: "123456",
    confirmPassword: "123456",
    acceptedRules: true
  };
  return (
    <div className="App">
      <div className="advertisment">
        {" "}
        <p>*** advertisment ***</p>{" "}
      </div>
      <h1>Login Form</h1>
      <FormComponent data={fakeData} />
    </div>
  );
}
