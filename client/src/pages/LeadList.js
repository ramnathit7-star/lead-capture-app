import { useEffect, useState } from "react";
import LeadDetailModal from "../components/LeadDetailModal";
import StatusBadge from "../components/StatusBadge";

function LeadList() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(stored);
  }, []);

  
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource =
      sourceFilter === "" || lead.source === sourceFilter;

    const matchesStatus =
      statusFilter === "" || lead.webhookStatus === statusFilter;

    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <div className="table-container">
      <h4 className="mb-4">Lead List</h4>
 
      <div className="row mb-3 g-3">

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

      </div>

       
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Created</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No Leads Found
              </td>
            </tr>
          ) : (
            filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                style={{ cursor: "pointer" }}
              >
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>
                <td>{new Date(lead.createdAt).toLocaleString()}</td>
                <td>
                  <StatusBadge status={lead.webhookStatus} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

     
      {selectedLead && (
        <LeadDetailModal
          selectedLead={selectedLead}
          closeModal={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}

export default LeadList;
