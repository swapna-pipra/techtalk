import React, { useState, useMemo } from 'react';
import { User, Search, Filter, X, Mail, MapPin, Briefcase, Users, LayoutGrid, List as ListIcon, Share2, Plus, Minus } from 'lucide-react';
import './OrgChart.css';

// 6. Sample Org Structure Data
const orgData = {
  id: 'e1',
  name: 'Jane Smith',
  designation: 'CEO',
  department: 'Executive',
  location: 'New York',
  email: 'jane.s@company.com',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  level: 'Director',
  reportsTo: null,
  children: [
    {
      id: 'e2',
      name: 'Sarah Jenkins',
      designation: 'HR Head',
      department: 'Human Resources',
      location: 'New York',
      email: 'sarah.j@company.com',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
      level: 'Director',
      reportsTo: 'Jane Smith',
      children: [
        {
          id: 'e3',
          name: 'Michael Chen',
          designation: 'HR Manager',
          department: 'Human Resources',
          location: 'Remote',
          email: 'michael.c@company.com',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
          level: 'Manager',
          reportsTo: 'Sarah Jenkins',
          children: [
            {
              id: 'e4',
              name: 'Alice Brown',
              designation: 'HR Executive',
              department: 'Human Resources',
              location: 'Remote',
              email: 'alice.b@company.com',
              photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
              level: 'Employee',
              reportsTo: 'Michael Chen',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'e5',
      name: 'David Wilson',
      designation: 'Tech Head',
      department: 'Engineering',
      location: 'San Francisco',
      email: 'david.w@company.com',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
      level: 'Director',
      reportsTo: 'Jane Smith',
      children: [
        {
          id: 'e6',
          name: 'Robert Fox',
          designation: 'Dev Manager',
          department: 'Engineering',
          location: 'San Francisco',
          email: 'robert.f@company.com',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
          level: 'Manager',
          reportsTo: 'David Wilson',
          children: [
            {
              id: 'e7',
              name: 'Emily Davis',
              designation: 'Senior Developer',
              department: 'Engineering',
              location: 'Remote',
              email: 'emily.d@company.com',
              photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
              level: 'Employee',
              reportsTo: 'Robert Fox',
              children: []
            },
            {
              id: 'e8',
              name: 'James Taylor',
              designation: 'Junior Developer',
              department: 'Engineering',
              location: 'San Francisco',
              email: 'james.t@company.com',
              photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
              level: 'Employee',
              reportsTo: 'Robert Fox',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'e9',
      name: 'Amanda Martinez',
      designation: 'Finance Head',
      department: 'Finance',
      location: 'New York',
      email: 'amanda.m@company.com',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
      level: 'Director',
      reportsTo: 'Jane Smith',
      children: [
        {
          id: 'e10',
          name: 'William Clark',
          designation: 'Finance Manager',
          department: 'Finance',
          location: 'New York',
          email: 'william.c@company.com',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
          level: 'Manager',
          reportsTo: 'Amanda Martinez',
          children: [
            {
              id: 'e11',
              name: 'Sophia White',
              designation: 'Accountant',
              department: 'Finance',
              location: 'New York',
              email: 'sophia.w@company.com',
              photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150',
              level: 'Employee',
              reportsTo: 'William Clark',
              children: []
            }
          ]
        }
      ]
    }
  ]
};

// Flatten tree for list/card views and filtering calculations
const flattenOrg = (node) => {
  let list = [{ ...node, childrenCount: node.children ? node.children.length : 0 }];
  if (node.children) {
    for (const child of node.children) {
      list = list.concat(flattenOrg(child));
    }
  }
  return list;
};

const flatOrgData = flattenOrg(orgData);
const departments = ['All', ...new Set(flatOrgData.map(e => e.department))];
const locations = ['All', ...new Set(flatOrgData.map(e => e.location))];
const levels = ['All', ...new Set(flatOrgData.map(e => e.level))];

// TreeNode Component for Tree View
const TreeNode = ({ node, onSelect, isMatch, isDimmed }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li>
      <div 
        className={`org-node-card ${isMatch ? 'match' : ''} ${isDimmed ? 'dimmed' : ''}`}
        onClick={() => onSelect(node)}
        style={{ borderTop: `4px solid ${node.level === 'Director' ? 'var(--primary)' : node.level === 'Manager' ? 'var(--warning)' : 'var(--secondary)'}` }}
      >
        <img src={node.photo} alt={node.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.5rem' }} />
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{node.name}</h3>
        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{node.designation}</p>
        <p style={{ margin: '0', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>{node.department}</p>
        
        {hasChildren && (
          <div className="node-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
            {expanded ? <Minus size={14} /> : <Plus size={14} />}
          </div>
        )}
      </div>
      
      {hasChildren && expanded && (
        <ul>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} onSelect={onSelect} isMatch={child.isMatch} isDimmed={child.isDimmed} />
          ))}
        </ul>
      )}
    </li>
  );
};

const OrgChart = () => {
  const [view, setView] = useState('tree'); // tree | card | list
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ department: 'All', location: 'All', level: 'All' });
  const [selectedNode, setSelectedNode] = useState(null);

  // Determine if a node matches search and filters
  const doesNodeMatch = (node) => {
    const s = search.toLowerCase();
    const matchSearch = search === '' || node.name.toLowerCase().includes(s) || node.department.toLowerCase().includes(s) || node.designation.toLowerCase().includes(s);
    const matchDept = filters.department === 'All' || node.department === filters.department;
    const matchLoc = filters.location === 'All' || node.location === filters.location;
    const matchLevel = filters.level === 'All' || node.level === filters.level;
    return matchSearch && matchDept && matchLoc && matchLevel;
  };

  // Build tree with match flags
  const annotateTree = (node) => {
    const isMatch = doesNodeMatch(node);
    let annotatedChildren = [];
    let hasMatchingDescendant = false;

    if (node.children) {
      for (const child of node.children) {
        const ac = annotateTree(child);
        annotatedChildren.push(ac);
        if (ac.isMatch || ac.hasMatchingDescendant) hasMatchingDescendant = true;
      }
    }

    // For tree view, if there is a search/filter, we dim non-matching nodes
    const isActiveFilter = search !== '' || filters.department !== 'All' || filters.location !== 'All' || filters.level !== 'All';
    const isDimmed = isActiveFilter && !isMatch;

    return { ...node, children: annotatedChildren, isMatch: isActiveFilter && isMatch, isDimmed, hasMatchingDescendant };
  };

  const annotatedTreeData = useMemo(() => annotateTree(orgData), [search, filters]);
  const flatFilteredData = useMemo(() => flatOrgData.filter(doesNodeMatch), [search, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1>Organization Chart</h1>
          <p className="text-muted">Explore the company hierarchy and team structure.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--surface)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <button className={`btn ${view === 'tree' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem' }} onClick={() => setView('tree')} title="Tree View"><Share2 size={18} /></button>
          <button className={`btn ${view === 'card' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem' }} onClick={() => setView('card')} title="Card View"><LayoutGrid size={18} /></button>
          <button className={`btn ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem' }} onClick={() => setView('list')} title="List View"><ListIcon size={18} /></button>
        </div>
      </div>

      {/* 3 & 4. Search and Filters */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div className="form-group" style={{ margin: 0, flex: 2, minWidth: '200px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder='Search name, role, or department...' 
            style={{ paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '150px' }}>
          <select className="form-control" name="department" value={filters.department} onChange={handleFilterChange}>
            {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
          </select>
        </div>
        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '150px' }}>
          <select className="form-control" name="location" value={filters.location} onChange={handleFilterChange}>
            {locations.map(d => <option key={d} value={d}>{d === 'All' ? 'All Locations' : d}</option>)}
          </select>
        </div>
        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '150px' }}>
          <select className="form-control" name="level" value={filters.level} onChange={handleFilterChange}>
            {levels.map(d => <option key={d} value={d}>{d === 'All' ? 'All Levels' : d}</option>)}
          </select>
        </div>
      </div>

      {/* 5. View Types Rendering */}
      <div className="card" style={{ padding: view === 'tree' ? '2rem 0' : '1.5rem', minHeight: '600px', overflowX: 'auto', backgroundColor: view === 'tree' ? 'var(--background)' : 'var(--surface)' }}>
        
        {view === 'tree' && (
          <div className="org-tree">
            <ul>
              <TreeNode node={annotatedTreeData} onSelect={setSelectedNode} isMatch={annotatedTreeData.isMatch} isDimmed={annotatedTreeData.isDimmed} />
            </ul>
          </div>
        )}

        {view === 'card' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {flatFilteredData.map(node => (
              <div key={node.id} className="card" onClick={() => setSelectedNode(node)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', borderTop: `4px solid ${node.level === 'Director' ? 'var(--primary)' : node.level === 'Manager' ? 'var(--warning)' : 'var(--secondary)'}` }}>
                <img src={node.photo} alt={node.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{node.name}</h3>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{node.designation}</p>
                  <span className="badge badge-info">{node.department}</span>
                </div>
              </div>
            ))}
            {flatFilteredData.length === 0 && <p className="text-muted" style={{ padding: '2rem' }}>No employees found.</p>}
          </div>
        )}

        {view === 'list' && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Reports To</th>
                </tr>
              </thead>
              <tbody>
                {flatFilteredData.map(node => (
                  <tr key={node.id} onClick={() => setSelectedNode(node)} style={{ cursor: 'pointer' }}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={node.photo} alt={node.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 500 }}>{node.name}</span>
                    </td>
                    <td>{node.designation}</td>
                    <td><span className="badge badge-info">{node.department}</span></td>
                    <td>{node.location}</td>
                    <td>{node.reportsTo || '-'}</td>
                  </tr>
                ))}
                {flatFilteredData.length === 0 && (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No employees found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 2. Employee Node Details Modal */}
      {selectedNode && (
        <div className="animate-fade-in" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', padding: 0, overflow: 'hidden' }}>
            
            {/* Modal Header Cover */}
            <div style={{ height: '100px', backgroundColor: 'var(--primary)', position: 'relative' }}>
              <button 
                onClick={() => setSelectedNode(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: '0 2rem 2rem 2rem', position: 'relative', marginTop: '-40px' }}>
              <img src={selectedNode.photo} alt={selectedNode.name} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--surface)', objectFit: 'cover', backgroundColor: 'var(--surface)' }} />
              
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ margin: '0 0 0.25rem 0' }}>{selectedNode.name}</h2>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>{selectedNode.designation}</p>
                  </div>
                  <span className="badge badge-info">{selectedNode.id.toUpperCase()}</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Basic & Contact Info */}
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Contact & Location</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <Briefcase size={16} color="var(--primary)" />
                      <span>{selectedNode.department}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <Mail size={16} color="var(--primary)" />
                      <span>{selectedNode.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <MapPin size={16} color="var(--primary)" />
                      <span>{selectedNode.location}</span>
                    </div>
                  </div>
                </div>

                {/* Reporting Info */}
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Reporting Information</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <User size={16} color="var(--warning)" />
                      <span><strong>Reports to:</strong> {selectedNode.reportsTo || 'Board of Directors'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <Users size={16} color="var(--success)" />
                      <span><strong>Direct Reports:</strong> {selectedNode.childrenCount} employee(s)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrgChart;
