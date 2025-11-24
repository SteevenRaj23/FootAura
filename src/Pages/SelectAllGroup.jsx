import React from "react";

export default function SelectAllGroup({ items, selected, onChange }) {
  const allSelected = selected.length === items.length;

  const toggleSelectAll = (checked) => {
    if (checked) {
      onChange(items); // select all items
    } else {
      onChange([]); // clear all
    }
  };

  const toggleSingle = (item) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div>
      {/* Select All */}
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => toggleSelectAll(e.target.checked)}
        />
        <label style={{ marginLeft: 6, color: "green", fontSize: 13 }}>
          Select All
        </label>
      </div>

      {/* Individual Checkboxes */}
      {items.map((item) => (
        <div key={item} className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => toggleSingle(item)}
          />
          <label style={{ marginLeft: 6, fontSize: 13 }}>{item}</label>
        </div>
      ))}
    </div>
  );
}
