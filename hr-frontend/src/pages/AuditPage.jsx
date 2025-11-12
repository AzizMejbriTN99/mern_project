import React, { useEffect, useState } from "react";
import { getAudits, createAudit, updateAudit, deleteAudit } from "../api/audit";
import EntityForm from "../components/EntityForm.jsx";

export default function AuditPage() {
    const [audits, setAudits] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchAudits = async () => {
        const res = await getAudits();
        setAudits(res.data);
    };

    useEffect(() => { fetchAudits(); }, []);

    const handleDelete = async (id) => {
        await deleteAudit(id);
        fetchAudits();
    };

    const handleSubmit = async (data) => {
        if (editing) {
            await updateAudit(editing.id, data);
            setEditing(null);
        } else {
            await createAudit(data);
        }
        fetchAudits();
    };

    const fields = [
        { name: "actionType", label: "Action Type" },
        { name: "entityName", label: "Entity Name" },
        { name: "entityId", label: "Entity ID", type: "number" },
        { name: "details", label: "Details" },
        { name: "timestamp", label: "Timestamp", type: "datetime-local" },
    ];

    return (
        <div>
            <h1>Audits</h1>
            <EntityForm entity="Audit" fields={fields} onSubmit={handleSubmit} initialData={editing} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Action</th><th>Entity</th><th>Entity ID</th><th>Details</th><th>Timestamp</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {audits.map(a => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.actionType}</td>
                            <td>{a.entityName}</td>
                            <td>{a.entityId}</td>
                            <td>{a.details}</td>
                            <td>{new Date(a.timestamp).toLocaleString()}</td>
                            <td>
                                <button onClick={() => setEditing(a)}>Edit</button>
                                <button onClick={() => handleDelete(a.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}