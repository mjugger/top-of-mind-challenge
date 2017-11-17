import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ContactFormActions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Paper,
  SelectField,
  DatePicker,
  RaisedButton,
  FlatButton,
  MenuItem,
  TextField
} from 'material-ui';

class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      type: '',
      leadscore: '',
      yearsknown: '',
      relation: '',
      number: '',
      numbertype: '',
      contactId: null,
      sceneHeaderText: '',
      submitBtnText: '',
      errorMessage: '',
      openDialog: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toHomeScene = this.toHomeScene.bind(this);
    this.handleContactFetch = this.handleContactFetch.bind(this);
  }

  componentWillMount() {
    const { contactId } = this.props;
    this.determineSceneText(contactId);
    this.handleContactFetch(contactId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  handleChange(event, index, type) {
    this.setState({type});
  }

  changeMultiField(data, propName) {
    const field = {};
    field[propName] = data;
    this.setState(field);
  }

  toHomeScene() {
    this.props.history.push('/');
  }

  handleSave() {
    const {
      type,
      name,
      email,
      address,
      yearsknown,
      leadscore,
      relation
    } = this.state;
    const fieldsToSend = {
      type,
      name,
      email,
      address

    };
    if (type === 'Friend') {
      fieldsToSend.yearsKnown = yearsknown;
    } else if (type === 'Lead') {
      fieldsToSend.leadScore = leadscore;
    } else if (type === 'Family') {
      fieldsToSend.relation = relation;
    }
    if (this.props.contactId) {
      this.props.actions.updateSingleContactRequest(
        fieldsToSend,
        this.props.contactId
      );
    } else {
      this.props.actions.createContactRequest(fieldsToSend);
    }
    this.toHomeScene();
  }

  handleContactFetch(contactId) {
    if (contactId) {
      this.props.actions.fetchSingleContactRequest(contactId);
    }
  }

  determineSceneText(contactId) {
    let sceneHeaderText;
    let submitBtnText;
    if (contactId) {
      sceneHeaderText = 'Edit contact';
      submitBtnText = 'Save';
    } else {
      sceneHeaderText = 'Create contact';
      submitBtnText = 'Create';
    }
    this.setState({
      sceneHeaderText,
      submitBtnText
    });
  }

  renderYearsKnown() {
    return (
      <TextField
        type="number"
        hintText="Enter years known"
        value={this.state.yearsknown}
        onChange={(error, data) => this.changeMultiField(data, 'yearsknown')}
      />
    );
  }

  renderLeadScore() {
    return (
      <TextField
        type="number"
        hintText="Enter lead score"
        value={this.state.leadscore}
        onChange={(error, data) => this.changeMultiField(data, 'leadscore')}
      />
    );
  }

  renderRelationType() {
    return (
      <TextField
        type="text"
        hintText="Enter relationship type"
        value={this.state.relation}
        onChange={(error, data) => this.changeMultiField(data, 'relation')}
      />
    );
  }

  determineFieldRender() {
    const { type } = this.state;
    let field;
    if (type === 'Friend') {
      field = this.renderYearsKnown();
    } else if (type === 'Lead') {
      field = this.renderLeadScore();
    } else if (type === 'Family') {
      field = this.renderRelationType();
    }
    return field;
  }

  render() {
    const {
      type,
      name,
      email,
      address,
      number,
      numbertype,
      leadscore,
      yearsknown,
      relation,
      sceneHeaderText,
      submitBtnText
    } = this.state;

    return (
      <Paper className="pageForm">
        <h1>{sceneHeaderText}</h1>
        <TextField
          type="text"
          hintText="Enter name"
          fullWidth={true}
          value={name}
          onChange={(error, data) => this.changeMultiField(data, 'name')}
        />
        <TextField
          type="text"
          hintText="Enter email"
          fullWidth={true}
          value={email}
          onChange={(error, data) => this.changeMultiField(data, 'email')}
        />
        <TextField
          type="text"
          hintText="Enter address"
          fullWidth={true}
          value={address}
          onChange={(error, data) => this.changeMultiField(data, 'address')}
        />
        <TextField
          type="text"
          hintText="Enter phone number"
          fullWidth={true}
          value={number}
          onChange={(error, data) => this.changeMultiField(data, 'number')}
        />
        <TextField
          type="text"
          hintText="Enter phone number type"
          fullWidth={true}
          value={numbertype}
          onChange={(error, data) => this.changeMultiField(data, 'numbertype')}
        />
        <SelectField
          floatingLabelText="Select Contact type..."
          value={type}
          onChange={this.handleChange}
           className="fullWidth"
        >
          <MenuItem
            value="Lead"
            primaryText="Lead"
          />
          <MenuItem
            value="Friend"
            primaryText="Friend"
          />
          <MenuItem
            value="Family"
            primaryText="Family"
          />
        </SelectField>
        <div>
          {this.determineFieldRender()}
        </div>
        <div className="buttonHolder">
          <FlatButton
            onClick={this.toHomeScene}
            label="Cancel"
            secondary={true}
          />
          <FlatButton
            onClick={() => this.handleSave()}
            label={submitBtnText}
            primary={true}
          />
        </div>
      </Paper>
    );
  }
}

ContactForm.PropTypes = {
  name: PropTypes.string,
  email:PropTypes.string,
  address:PropTypes.string,
  type:PropTypes.string,
  leadscore:PropTypes.string,
  yearsknown:PropTypes.string,
  relation:PropTypes.string,
  number: PropTypes.string,
  numbertype: PropTypes.string,
  contactId: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps(state, {match}) {
  return {
    name: state.ContactFormReducer.name,
    email: state.ContactFormReducer.email,
    address: state.ContactFormReducer.address,
    type: state.ContactFormReducer.type,
    leadscore: state.ContactFormReducer.leadscore,
    yearsknown: state.ContactFormReducer.yearsknown,
    relation: state.ContactFormReducer.relation,
    number: state.ContactFormReducer.number,
    numbertype: state.ContactFormReducer.numbertype,
    contactId: match.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContactFormActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactForm));
