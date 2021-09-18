
import {connect} from 'react-redux';
import MockModal from '../../modals/mock_modal';
import { toggleMockModal } from '../../../actions/modal_actions';
import { toggleConflicts } from '../../../actions/timetable_actions';

const mapStateToProps = state => ({
    isVisible: state.mockModal.isVisible,
    withConflicts: state.preferences.try_with_conflicts,
});

const MockModalContainer = connect(
        mapStateToProps, 
    {
        toggleMockModal,
        toggleConflicts,
        applyPreferences: toggleMockModal,
    },
)(MockModal);

export default MockModalContainer;