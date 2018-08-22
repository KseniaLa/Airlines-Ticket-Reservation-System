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
      nameRu: '',
      nameEn: '',
      isInputError: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateRuField = this.updateRuField.bind(this);
    this.updateEnField = this.updateEnField.bind(this);
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
    this.addField = this.addField.bind(this);
  }

  componentDidMount() {
    this.addField();
  }

  onAddBtnClick() {
    this.addField();
  }

  addField() {
    const inputList = this.state.inputList;
    this.setState({
      inputList: inputList.concat(
        <div key={this.state.inputList.length}>
          <TextField type="text" hint="ru" onUpdate={this.updateRuField} />
          <Select
            items={['ru', 'en']}
            value={this.state.class}
            values={['ru', 'en']}
          />
        </div>,
      ),
    });
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
        <Button text="+" onClick={this.onAddBtnClick} />
        <form className="add-location" onSubmit={this.onSubmit}>
          {this.state.isInputError && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidinput} />}
            />
          )}
          {/*<div>
            <TextField type="text" hint="ru" onUpdate={this.updateRuField} />
          </div>
          <div>
            <TextField type="text" hint="en" onUpdate={this.updateEnField} />
          </div>*/}
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
  onSubmit: PropTypes.func,
};

export default AddLocationForm;
