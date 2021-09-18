
import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'boron/FadeModal';

class MockModal extends React.Component {
    componetDidUpdate() {
        if (this.props.isVisible) {
            this.modal.show();
        }
    }

    render() {
        const modalHeader =
        (<div className="modal-content">
          <div className="modal-header">
            <h1>Timetable Preferences</h1>
          </div>
        </div>);
        const modalStyle = {
            width: '100%',
        };
        //const modalHeader = ();
        return (
        <Modal 
            ref={(c) => { this.modal = c; }}
            className="pref-modal max-modal"
            modalStyle={modalStyle}
            onHide={this.props.toggleMockModal}
            >
            {modalHeader}
                
                <div className="mock-modal__container">
                    <h4> Mock Modal!</h4>
                </div>
            </Modal>
        );
    }
}

MockModal.propTypes = {
    toggleConflicts: PropTypes.func.isRequired,
    withConflicts: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    toggleMockModal: PropTypes.func.isRequired,
};

export default MockModal;