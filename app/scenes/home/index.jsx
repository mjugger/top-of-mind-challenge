import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as HomeActions from './actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Dialog,
  FlatButton,
  RaisedButton,
  Paper
} from 'material-ui';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      openDialog: false,
      idOfContactToDelete: 0
    };
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.handleContactDelete = this.handleContactDelete.bind(this);
    this.renderDeleteDialog = this.renderDeleteDialog.bind(this);
    this.renderContactTable = this.renderContactTable.bind(this);
    this.renderCreateNewContact = this.renderCreateNewContact.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
    this.renderNoContactsFound = this.renderNoContactsFound.bind(this);
    this.whichViewToRender = this.whichViewToRender.bind(this);
    this.toNewContactScene = this.toNewContactScene.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchAllContactsRequest();
  }

  openDeleteDialog(id) {
    this.setState({
      openDialog: true,
      idOfContactToDelete: id
    });
  }

  closeDeleteDialog() {
    this.setState({openDialog: false});
  }

  handleContactDelete() {
    this.props.actions.deleteContactRequest(this.state.idOfContactToDelete);
    this.closeDeleteDialog();
  }

  toEditContactScene(id) {
    this.props.history.push(`/contact/update/${id}`);
  }

  toNewContactScene() {
    this.props.history.push(`/contact/new`);
  }

  renderDeleteDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeDeleteDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleContactDelete}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Delete Contact"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.closeDeleteDialog}
        >
          Are you sure you want to delete this Contact?
        </Dialog>
      </div>
    );
  }

  renderCreateNewContact() {
    return (
      <RaisedButton
        onClick={this.toNewContactScene}
        primary={true}
        label="Create new contact"
      />
    );
  }

  renderNoContactsFound() {
    return (
      <div className="noContactsMessage">
        <Paper className="paper">
          <h3>There are no site contacts.</h3>
          {this.renderCreateNewContact()}
        </Paper>
      </div>
    );
  }

  renderTableRow(contact) {
    return (
      <TableRow key={contact._id}>
        <TableRowColumn>{contact.name}</TableRowColumn>
        <TableRowColumn>{contact.email}</TableRowColumn>
        <TableRowColumn>{contact.address}</TableRowColumn>
        <TableRowColumn>{contact.type}</TableRowColumn>
        <TableRowColumn>{contact.leadscore}</TableRowColumn>
        <TableRowColumn>{contact.yearsknown}</TableRowColumn>
        <TableRowColumn>{contact.relation}</TableRowColumn>
        <TableRowColumn>
          <FlatButton
            primary={true}
            label="Edit"
            onClick={() => this.toEditContactScene(contact._id)}
          />
          <FlatButton
            label="Delete"
            secondary={true}
            onClick={() => this.openDeleteDialog(contact._id)}
          />
        </TableRowColumn>
      </TableRow>
    );
  }

  renderContactTable(contacts) {
    return (
      <div>
        {this.renderDeleteDialog()}
        <Table selectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Contact type</TableHeaderColumn>
              <TableHeaderColumn>Lead score</TableHeaderColumn>
              <TableHeaderColumn>Years known</TableHeaderColumn>
              <TableHeaderColumn>Relation</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {contacts.map((contact, index) =>
              this.renderTableRow(contact)
            )}
          </TableBody>
        </Table>
        <div className="buttonHolder">{this.renderCreateNewContact()}</div>
      </div>
    );
  }

  whichViewToRender(contacts) {
    let viewToRender;
    if (contacts.length > 0) {
      viewToRender = this.renderContactTable(contacts);
    } else {
      viewToRender = this.renderNoContactsFound();
    }
    return (viewToRender);
  }

  render() {
    const { contacts } = this.props;
    return (
      <div>
        {this.whichViewToRender(contacts)}
      </div>
    );
  }
}

Home.PropTypes = {
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps(state) {
  return {
    contacts: state.HomeReducer.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HomeActions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
