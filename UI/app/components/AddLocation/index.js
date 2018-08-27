import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import Select from '../basic/Select';
import TextField from '../basic/TextField';
import ErrorMessage from '../basic/ErrorMessage';
import './style.scss';

class AddLocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [],
      data: [],
      savedData: {},
      addedData: {},
    };
    this.getTranslations = this.getTranslations.bind(this);
    this.getNewItems = this.getNewItems.bind(this);
    this.mapPropTranslationsToState = this.mapPropTranslationsToState.bind(
      this,
    );
    this.addItemToState = this.addItemToState.bind(this);
  }

  componentDidMount() {
    this.mapPropTranslationsToState();
  }

  deleteSaved(key) {
    const obj = this.state.savedData;
    delete obj[key];
    this.setState({ savedData: obj });
  }

  deleteAdded(key) {
    const obj = this.state.addedData;
    delete obj[key];
    this.setState({ addedData: obj });
  }

  addItemToState() {
    const obj = this.state.addedData;
    const newKey = Object.keys(obj).length;
    // inc key
    obj[newKey] = { value: '', language: '' };
    this.setState({ addedData: obj });
  }

  mapPropTranslationsToState() {
    const obj = {};
    const { translations } = this.props;
    translations.forEach((element, index) => {
      obj[index] = { value: element.value, language: element.language };
    });
    this.setState({ savedData: obj });
  }

  getTranslations() {
    const list = [];
    const { savedData } = this.state;
    Object.keys(savedData).forEach((key, index) => {
      const element = savedData[key];
      list.push(
        <div key={index}>
          {element.language} -{' '}
          <TextField onUpdate={e => this.updateSavedField(key, e)}>
            {element.value}
          </TextField>
          <Button text="-" onClick={e => this.deleteSaved(key, e)} />
        </div>,
      );
    });
    return list;
  }

  getNewItems() {
    const list = [];
    const { addedData } = this.state;
    Object.keys(addedData).forEach((key, index) => {
      const element = addedData[key];
      list.push(
        <div key={index}>
          <Select
            items={this.props.lang}
            value={this.state.class}
            values={this.props.values}
            notSelected
            placeholder={this.props.langTitle}
            onChange={e => this.updateSelect(key, e)}
          />
          <TextField onUpdate={e => this.updateAddedField(key, e)} />
          <Button text="-" onClick={e => this.deleteAdded(key, e)} />
        </div>,
      );
    });
    return list;
  }

  updateSelect(key, e) {
    const obj = this.state.addedData;
    obj[key].language = e.target.value;
    this.setState({ addedData: obj });
  }

  updateSavedField(key, e) {
    const obj = this.state.savedData;
    obj[key].value = e.target.value;
    this.setState({ savedData: obj });
  }

  updateAddedField(key, e) {
    const obj = this.state.addedData;
    obj[key].value = e.target.value;
    this.setState({ addedData: obj });
  }

  render() {
    return (
      <div>
        <Button text="+" onClick={this.addItemToState} />
        <div className="add-location">
          {this.getTranslations()}
          {this.getNewItems()}
          <div>
            <Button text="save" />
          </div>
        </div>
      </div>
    );
  }
}

AddLocationForm.propTypes = {
  lang: PropTypes.array,
  values: PropTypes.array,
  langTitle: PropTypes.any,
  translations: PropTypes.any,
};

export default AddLocationForm;
