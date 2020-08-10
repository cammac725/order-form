import React, { Component } from 'react';
import './style.css';

const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string, set valid to false
    val => val.length > 0 && (valid = false)
  );
  return valid;
}

class OrderApp extends Component {
  state = {
    size: 'medium',
    glutenFree: false,
    toppings: '',
    instructions: '',
    pizzaName: null,
    email: null,
    password: null,
    errors: {
      pizzaName: '',
      email: '',
      password: '',
    }
  };

  setSize = e => {
    this.setState({
      size: e.target.value
    })
  }

  setGlutenFree = e => {
    this.setState({
      glutenFree: e.target.checked
    });
  }

  setToppings = e => {
    this.setState({
      toppings: e.target.value
    })
  }

  setInstructions = e => {
    this.setState({
      instructions: e.target.value
    })
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'pizzaName':
        errors.pizzaName = 
          value.length < 5
          ? 'Pizza Name must be more than 5 characters long.'
          : '';
        break;

      case 'email':
        errors.email = validEmailRegex.test(value)
          ? ''
          : 'email is not valid';
        break;

      case 'password':
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long.'
            : '';
          break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      size,
      glutenFree,
      toppings,
      instructions
    } = this.state;

    if (validateForm(this.state.errors)) {
      console.log('Valid form');
      alert(`Your order:
        Size: ${size}
        Gluten free?: ${glutenFree ? 'yes' : 'no'}
        Toppings: ${toppings || 'none'}
        Special Instructions: ${instructions || 'none'}` 
      );
    } else {
      console.log('Invalid form');
    };
  }

  render() {
    const {
      size,
      glutenFree,
      toppings,
      instructions,
      errors,
    } = this.state;

    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h1>Order Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='pizza-name'>
              <label>Pizza Name</label>
              <input
                type="text"
                name="pizzaName"
                onChange={this.handleChange}
              />
              {errors.pizzaName.length > 0 && 
                <span className='error'>{errors.pizzaName}</span>}
            </div>
            <div className='email'>
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
              />
            </div>

            <label>Size</label>
            <div className='size'>
              <label>
                <input
                type="radio"
                value='small'
                checked={size === 'small'}
                onChange={this.setSize}
                />
                Small
              </label>
              <label>
                <input
                type="radio"
                value='medium'
                checked={size === 'medium'}
                onChange={this.setSize}
                />
                Medium
             </label>
              <label>
                <input
                type="radio"
                value='large'
                checked={size === 'large'}
                onChange={this.setSize}
                />
                Large
              </label>
            </div>

            <br />
            <br />

            <div className='toppings'>
              <label>
                Toppings
                <br />
                <select onChange={this.setToppings} value={toppings} >
                  <option value=''>- Pick a topping -</option>
                  <option
                    value='pepperoni+mushrooms'>Pepperoni and mushrooms
                  </option>
                  <option
                    value='hawaiian'>Hawaiian
                  </option>
                  <option
                    value='sausage+onions'>Sausage and onions
                  </option>
                </select>
              </label>
            </div>

            <br />
            <br />
            
            <label>
              <input
                type='checkbox'
                checked={glutenFree}
                onChange={this.setGlutenFree}  
              />
              Gluten Free
            </label>
            
            <br/>
            <br/>

            <div className='instructions'>
              <label>
                Special instructions
                <br />
                <textarea 
                  value={instructions}
                  onChange={this.setInstructions}
                />
              </label>
            </div>

            <br/>
            <br/>

            <div className='password'>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>

            <button type='submit'>Send Order</button>
          </form>
        </div>
      </div>
    )
  }
}

export default OrderApp;