import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import TextField from '../basic/TextField';
import ErrorMessage from '../basic/ErrorMessage';

import messages from './messages';
import './style.scss';

class AddLocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langName: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateNameField = this.updateNameField.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.langName) {
      this.setState({ isInputError: false });
      this.props.onSubmit(this.state.langName);
    } else {
      this.setState({ isInputError: true });
    }
  }

  updateNameField(e) {
    this.setState({ langName: e.target.value });
  }

  render() {
    return (
      <div>
        <form className="add-language" onSubmit={this.onSubmit}>
          {this.state.isInputError && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidinput} />}
            />
          )}
          <TextField type="text" hint="" onUpdate={this.updateNameField} />
          <div>
            <Button text={<FormattedMessage {...messages.add} />} />
          </div>
        </form>
      </div>
    );
  }
}

AddLocationForm.propTypes = {
  lang: PropTypes.array,
  values: PropTypes.array,
  onSubmit: PropTypes.func,
};

export default AddLocationForm;
