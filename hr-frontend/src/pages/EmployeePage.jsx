import React, { useEffect, useState } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api/employee";
import { getDepartments } from "../api/department";
import { getSalaries } from "../api/salary";
import EntityForm from "../components/EntityForm.jsx";

export default function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchEmployees = async () => {
        const res = await getEmployees();
        console.log("res = ", res)
        const dataWithId = res.data.map(emp => ({
            id: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            jobTitle: emp.jobTitle,
            departmentName: emp.departmentId?.name || "",
            salaryTotal: emp.salaryId ? emp.salaryId.baseSalary + emp.salaryId.bonus - emp.salaryId.deductions : 0,
        }));
        setEmployees(dataWithId);
    };

    // Departments
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

    // Salaries
    const fetchSalaries = async () => {
        const res = await getSalaries();
        const dataWithId = res.data.map(s => ({
            id: s._id,
            baseSalary: s.baseSalary,
            bonus: s.bonus,
            deductions: s.deductions,
        }));
        setSalaries(dataWithId);
    };

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
        fetchSalaries();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            fetchEmployees();
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    };

    const handleSubmit = async (data) => {
        if (editing) {
            await updateEmployee(editing.id, data);
            setEditing(null);
        } else {
            await createEmployee(data);
        }
        fetchEmployees();
    };

    const fields = [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "jobTitle", label: "Job Title" },
        {
            name: "departmentId",
            label: "Department",
            type: "select",
            options: departments.map(d => ({ value: d.id, label: d.name })),
        },
        {
            name: "salaryId",
            label: "Salary",
            type: "select",
            options: salaries.map(s => ({
                value: s.id,
                label: `${s.id} - ${s.baseSalary + s.bonus - s.deductions}`,
            })),
        },
    ];

    console.log("Departments for select:", departments);
    console.log("Salaries for select:", salaries);
    console.log("Employees list:", employees);

    return (
        <div>
            <h1>Employeeeeees</h1>
            <EntityForm
                key={`${departments.length}-${salaries.length}`}
                entity="Employee"
                fields={fields}
                onSubmit={handleSubmit}
                initialData={editing}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Job</th><th>Dept</th><th>Salary</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstName} {emp.lastName}</td>
                            <td>{emp.jobTitle}</td>
                            <td>{emp.departmentName}</td>
                            <td>{emp.salaryTotal}</td>
                            <td>
                                <button onClick={() => setEditing(emp)}>Edit</button>
                                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
