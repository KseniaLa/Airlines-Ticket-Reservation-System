import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import Select from '../basic/Select';
import TextField from '../basic/TextField';
import ErrorMessage from '../basic/ErrorMessage';

import messages from './messages';
import './style.scss';

class AddLocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [],
      data: [],
      inputOccured: false,
      isInputError: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateNameField = this.updateNameField.bind(this);
    this.updateLangField = this.updateLangField.bind(this);
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
    this.addField = this.addField.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
    this.deleteField = this.deleteField.bind(this);
  }

  componentDidMount() {
    // this.addField();
  }

  onAddBtnClick() {
    this.addField();
  }

  onDeleteBtnClick() {
    this.deleteField();
  }

  addField() {
    if (
      this.state.data.length > 0 &&
      this.state.data.length === this.props.lang.length
    ) {
      return;
    }
    const { inputList, data } = this.state;
    this.setState({
      data: data.concat({ language: '', value: '' }),
    });
    this.setState({
      inputList: inputList.concat(
        <div key={this.state.inputList.length}>
          <TextField
            type="text"
            hint=""
            onUpdate={e => this.updateNameField(inputList.length, e)}
          />
          <Select
            items={this.props.lang}
            value={this.state.class}
            values={this.props.values}
            notSelected
            placeholder="lang"
            onChange={e => this.updateLangField(inputList.length, e)}
          />
        </div>,
      ),
    });
  }

  deleteField() {
    const { inputList, data } = this.state;
    if (inputList.length === 1 || data.length === 1) {
      return;
    }
    this.setState({
      data: data.slice(0, -1),
    });
    this.setState({
      inputList: inputList.slice(0, -1),
    });
  }

  fieldsNotEmpty(fields) {
    const hasEmpty = element => {
      if (element.value && element.language) {
        return false;
      }
      return true;
    };
    if (fields.find(hasEmpty) === undefined) {
      return true;
    }
    return false;
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.data.length) {
      this.addField();
      return;
    }
    if (this.fieldsNotEmpty(this.state.data) && this.state.inputOccured) {
      this.setState({ isInputError: false });
      this.props.onSubmit(this.state.data);
    } else {
      this.setState({ isInputError: true });
    }
  }

  updateNameField(num, e) {
    this.state.data[num].value = e.target.value;
    this.setState({ inputOccured: true });
  }

  updateLangField(num, e) {
    this.state.data[num].language = e.target.value;
    this.setState({ inputOccured: true });
  }

  render() {
    return (
      <div>
        <Button text="+" onClick={this.onAddBtnClick} />
        <Button text="-" onClick={this.onDeleteBtnClick} />
        <form className="add-location" onSubmit={this.onSubmit}>
          {this.state.isInputError && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidinput} />}
            />
          )}
          {this.state.inputList}
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
