'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Trash2 } from 'lucide-react';

const defaultOperators = ['<', '<=', '=', '>=', '>'];

export default function Sidebar() {
  const { polygonRules, setPolygonRules } = useDashboardStore();

  // For now, we simulate one selected polygon with id 'polygon-1'
  const polygonId = 'polygon-1';

  const polygonRule = polygonRules.find(p => p.polygonId === polygonId);
  const currentRules = polygonRule?.rules || [];

  const handleAddRule = () => {
    const updated = polygonRules.map((poly) => {
      if (poly.polygonId === polygonId) {
        return {
          ...poly,
      rules: [...poly.rules, { operator: '<' as '<' | '<=' | '=' | '>=' | '>', value: 0, color: '#ff0000' }]

        };
      }
      return poly;
    });
    setPolygonRules(updated);
  };

  const handleDeleteRule = (index: number) => {
    const updated = polygonRules.map((poly) => {
      if (poly.polygonId === polygonId) {
        const newRules = [...poly.rules];
        newRules.splice(index, 1);
        return { ...poly, rules: newRules };
      }
      return poly;
    });
    setPolygonRules(updated);
  };

  const handleChange = (index: number, key: keyof (typeof currentRules)[0], value: any) => {
    const updated = polygonRules.map((poly) => {
      if (poly.polygonId === polygonId) {
        const newRules = [...poly.rules];
        newRules[index] = { ...newRules[index], [key]: value };
        return { ...poly, rules: newRules };
      }
      return poly;
    });
    setPolygonRules(updated);
  };

  const handleDataSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dataSource = e.target.value;
    const updated = polygonRules.map((poly) =>
      poly.polygonId === polygonId ? { ...poly, dataSource } : poly
    );
    setPolygonRules(updated);
  };

  return (
    <div className="w-80 bg-slate-900 text-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Polygon Data Rules</h2>

      <label className="block text-sm">Select Data Source:</label>
      <select
        className="w-full p-2 rounded bg-slate-700"
        value={polygonRule?.dataSource || 'temperature_2m'}
        onChange={handleDataSourceChange}
      >
        <option value="temperature_2m">Temperature 2m</option>
        {/* Add more data sources later */}
      </select>

      <div className="space-y-3">
        {currentRules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="color"
              value={rule.color}
              onChange={(e) => handleChange(index, 'color', e.target.value)}
              className="w-10 h-10 rounded"
            />
            <select
              value={rule.operator}
              onChange={(e) =>
  handleChange(index, 'operator', e.target.value as '<' | '<=' | '=' | '>=' | '>')
}

              className="p-1 rounded bg-slate-800"
            >
              {defaultOperators.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={rule.value}
              onChange={(e) => handleChange(index, 'value', +e.target.value)}
              className="p-1 w-20 rounded bg-slate-800"
            />
            <button onClick={() => handleDeleteRule(index)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddRule}
        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
      >
        + Add Rule
      </button>
    </div>
  );
}
