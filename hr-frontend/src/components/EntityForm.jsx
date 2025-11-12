import React, { useState, useEffect } from "react";

export default function EntityForm({ entity, fields, onSubmit, initialData }) {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((f) => (
                <div key={f.name}>
                    <label>{f.label}:</label>
                    {f.type === "select" ? (
                        <select name={f.name} value={formData[f.name] || ""} onChange={handleChange}>
                            <option value="">-- Select --</option>
                            {f.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={f.type || "text"}
                            name={f.name}
                            value={formData[f.name] || ""}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <button type="submit">Save {entity}</button>
        </form>
    );
}