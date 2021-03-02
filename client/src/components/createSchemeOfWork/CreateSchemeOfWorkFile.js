import React from "react";

class CreateSchemeOfWorkFile extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id="create-schemeOf__workFile"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                UPLOAD SCHEME OF WORK
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">
                    Choose Scheme of Work <strong>:</strong>
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save Scheme
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateSchemeOfWorkFile;
