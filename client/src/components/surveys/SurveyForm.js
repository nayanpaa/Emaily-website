import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; //helper from redux form to communicate to redux store
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

//component is an onlder version of function components that use state
  //react components are stateless
//FIeld is a swiss army knife that will take parameters
  //name is the name of the text that we can access in the store
  //to customize, we can put an object in component, in our case we'll but <SurveyField />
//With the form
  //handleSubmit is a prop handled by redux form



class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, field => {
      return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');


  if(!values.title) {
    errors.title = 'You must provide a title'; //title, and field with thte name title match on purpose, redux knows this
  }
  if(!values.subject) {
    errors.subject = 'You must provide a subject'; //title, and field with thte name title match on purpose, redux knows this
  }
  if(!values.body) {
    errors.body = 'You must provide a body'; //title, and field with thte name title match on purpose, redux knows this
  }
  if(!values.recipients) {
    errors.recipients = 'You must provide an email'; //title, and field with thte name title match on purpose, redux knows this
  }

  
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm); 