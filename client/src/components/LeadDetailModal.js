function LeadDetailModal({ selectedLead, closeModal }) {
  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5>Lead Details</h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>

          <div className="modal-body">
            <p><strong>Name:</strong> {selectedLead.name}</p>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>Mobile:</strong> {selectedLead.mobile}</p>
            <p><strong>Company:</strong> {selectedLead.company}</p>
            <p><strong>Source:</strong> {selectedLead.source}</p>
            <p><strong>Created At:</strong> {new Date(selectedLead.createdAt).toLocaleString()}</p>
            <p><strong>Webhook:</strong> {selectedLead.webhookStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailModal;
