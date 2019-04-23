import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.titleText}</p>
            <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <section className="modal-card-body">
          {
            this.props.contentText.split('\n').map((item, i) => {
                return <p key={i}>{item}</p>;
            })
          }
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={this.props.onClose}>{this.props.primaryButtonTitle}</button>
          </footer>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  titleText: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  primaryButtonTitle: PropTypes.string.isRequired
};

export default Modal;
