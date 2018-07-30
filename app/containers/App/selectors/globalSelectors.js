import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectIsModalVisible = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('modalVisible'),
);

export {
    makeSelectIsModalVisible,
};