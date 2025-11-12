import React, { useEffect, useState } from "react";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../api/department";
import EntityForm from "../components/EntityForm.jsx";

export default function DepartmentPage() {
    const [departments, setDepartments] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchDepartments = async () => {
        const res = await getDepartments();
        const dataWithId = res.data.map(dep => ({
            id: dep._id,
            name: dep.name,
            manager: dep.manager,
            employeeIds: dep.employeeIds || [],
        }));
        setDepartments(dataWithId);
    };

    useEffect(() => { fetchDepartments(); }, []);

    const handleDelete = async (id) => { await deleteDepartment(id); fetchDepartments(); }
    const handleSubmit = async (data) => {
        if (editing) { await updateDepartment(editing.id, data); setEditing(null); }
        else await createDepartment(data);
        fetchDepartments();
    }

    const fields = [
        { name: "name", label: "Name" },
        { name: "manager", label: "Manager" },
    ];

    return (
        <div>
            <h1>Departments</h1>
            <EntityForm entity="Department" fields={fields} onSubmit={handleSubmit} initialData={editing} />
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Manager</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {departments.map(dep => (
                        <tr key={dep.id}>
                            <td>{dep.id}</td><td>{dep.name}</td><td>{dep.manager}</td>
                            <td><button onClick={() => setEditing(dep)}>Edit</button>
                                <button onClick={() => handleDelete(dep.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
