function StatusBadge({ status }) {
  const getClass = () => {
    if (status === "success") return "badge bg-success";
    if (status === "failed") return "badge bg-danger";
    return "badge bg-warning";
  };

  return <span className={getClass()}>{status}</span>;
}

export default StatusBadge;
