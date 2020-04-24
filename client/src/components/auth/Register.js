import React, {useState, useEffect, useReducer} from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

function Register(props) {
  const currentState = useSelector(state => state);
  const dispatch = useDispatch();
  const [input, setState] = useState({
    name: '',
    password: '',
    password2: '',
    errors: {}
  })

  useEffect(() => {
      setState({ errors: input.errors });
  }, [input.errors])

  const handleInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...input,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(registerUser(input, props.history))
  };

  return (
    <div className="reg-container">
      <h3 className="text-center mb-4">Register</h3>
      <form noValidate onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="username" error={input.errors.name} onChange={handleInputChange} />
        <span className="red-text">{input.errors.name}</span>

        <input className="form-control mb-2" name="password"  placeholder="password" error={input.errors.password} onChange={handleInputChange} />
        <span className="red-text">{input.errors.passwor2}</span>

        <input className="form-control mb-4" name="password2"  placeholder="confirm password" error={input.errors.password2} onChange={handleInputChange} />
        <span className="red-text">{input.errors.password2}</span>

        <button type="submit" className="btn btn-success w-100 mb-2">Create Account</button>
      </form>

      <div className="text-center mt-2">
        <Link className="text-center" to="/">cancel</Link>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
