import React, { useEffect, useState } from "react";
import { getSalaries, createSalary, updateSalary, deleteSalary } from "../api/salary";
import EntityForm from "../components/EntityForm.jsx";

export default function SalaryPage() {
    const [salaries, setSalaries] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchSalaries = async () => {
    const res = await getSalaries();

    const dataWithId = res.data.map(s => ({
        id: s._id,
        baseSalary: s.baseSalary,
        bonus: s.bonus,
        deductions: s.deductions
    }));
    setSalaries(dataWithId);
};

    useEffect(() => { fetchSalaries(); }, []);

    const handleDelete = async (id) => {
        await deleteSalary(id);
        fetchSalaries();
    };

    const handleSubmit = async (data) => {
        if (editing) {
            await updateSalary(editing.id, data);
            setEditing(null);
        } else {
            await createSalary(data);
        }
        fetchSalaries();
    };

    const fields = [
        { name: "baseSalary", label: "Base Salary", type: "number" },
        { name: "bonus", label: "Bonus", type: "number" },
        { name: "deductions", label: "Deductions", type: "number" },
    ];

    return (
        <div>
            <h1>Salaries</h1>
            <EntityForm entity="Salary" fields={fields} onSubmit={handleSubmit} initialData={editing} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Base</th><th>Bonus</th><th>Deductions</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map(sal => (
                        <tr key={sal.id}>
                            <td>{sal.id}</td>
                            <td>{sal.baseSalary}</td>
                            <td>{sal.bonus}</td>
                            <td>{sal.deductions}</td>
                            <td>
                                <button onClick={() => setEditing(sal)}>Edit</button>
                                <button onClick={() => handleDelete(sal.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}