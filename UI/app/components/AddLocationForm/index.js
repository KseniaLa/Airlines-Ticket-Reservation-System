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
      nameRu: '',
      nameEn: '',
      isInputError: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateRuField = this.updateRuField.bind(this);
    this.updateEnField = this.updateEnField.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.nameRu !== '' && this.state.nameEn !== '') {
      this.setState({ isInputError: false });
      this.props.onSubmit([
        { language: 'ru', value: this.state.nameRu },
        { language: 'en', value: this.state.nameEn },
      ]);
    } else {
      this.setState({ isInputError: true });
    }
  }

  updateRuField(e) {
    this.setState({ nameRu: e.target.value });
  }

  updateEnField(e) {
    this.setState({ nameEn: e.target.value });
  }

  render() {
    return (
      <div>
        <form className="add-location" onSubmit={this.onSubmit}>
          {this.state.isInputError && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidinput} />}
            />
          )}
          <div>
            <TextField type="text" hint="ru" onUpdate={this.updateRuField} />
          </div>
          <div>
            <TextField type="text" hint="en" onUpdate={this.updateEnField} />
          </div>
          <div>
            <Button text={<FormattedMessage {...messages.add} />} />
          </div>
        </form>
      </div>
    );
  }
}

AddLocationForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddLocationForm;
