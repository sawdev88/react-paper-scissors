import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

function Login(props) {
  const currentState = useSelector(state => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    password: '',
    errors: {}
  })

  useEffect(() => {

    if (currentState.auth.isAuthenticated) {
        console.log(state)
        console.log(currentState)
        props.history.push('/')
    } else {
      console.log('no auth')
    }

  }, [state])

  const handleInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(loginUser(state))

    console.log(state);
  };

  return (
    <div className="reg-container">
      <h3 className="text-center mb-4">Login</h3>
      <form noValidate onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="username" error={state.errors.name} onChange={handleInputChange} />
        <input className="form-control mb-2" name="password"  placeholder="password" error={state.errors.password} onChange={handleInputChange} />

        <button type="submit" className="btn btn-success w-100 mb-2">Login</button>
      </form>

      <Link to="/register" className="btn btn-info w-100">Create Account</Link>
      <div className="text-center mt-2">
        <Link className="text-center" to="/">cancel</Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
