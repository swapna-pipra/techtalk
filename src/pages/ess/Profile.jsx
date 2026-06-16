import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('http://localhost:3001/api/profile')
      .then(res => res.json())
      .then(data => {
        setProfileData(data);
        setEditData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      if (response.ok) {
        setProfileData(editData);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading || !profileData) {
    return <div className="animate-fade-in" style={{ padding: '2rem' }}>Loading profile data...</div>;
  }

  const displayData = isEditing ? editData : profileData;

  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>My Profile</h1>
          <p className="text-muted">Manage your personal information and contact details.</p>
        </div>
        {isEditing ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
        )}
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={displayData.profilePhoto} 
              alt="Profile avatar" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--border)', objectFit: 'cover' }}
            />
            {isEditing && (
              <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', cursor: 'pointer' }}>
                Change
              </div>
            )}
          </div>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>{displayData.employeeName}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{displayData.designation} • {displayData.department}</p>
            <span className="badge badge-success">{displayData.employeeStatus}</span>
          </div>
        </div>
        {isEditing && (
           <div className="form-group" style={{ marginTop: '1rem', maxWidth: '400px' }}>
              <label className="form-label">Profile Photo URL</label>
              <input type="text" name="profilePhoto" className="form-control" value={displayData.profilePhoto} onChange={handleChange} />
           </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Employment Information</h3>
        <div style={gridStyle}>
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input type="text" className="form-control" value={displayData.employeeId} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Employee Name</label>
            <input type="text" className="form-control" value={displayData.employeeName} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Employee Code</label>
            <input type="text" className="form-control" value={displayData.employeeCode} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" className="form-control" value={displayData.department} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Designation</label>
            <input type="text" className="form-control" value={displayData.designation} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Reporting Manager</label>
            <input type="text" className="form-control" value={displayData.manager} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <input type="text" className="form-control" value={displayData.employmentType} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Joining</label>
            <input type="text" className="form-control" value={displayData.joiningDate} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Work Location</label>
            <input type="text" className="form-control" value={displayData.workLocation} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Employee Status</label>
            <input type="text" className="form-control" value={displayData.employeeStatus} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Company Email</label>
            <input type="email" className="form-control" value={displayData.companyEmail} disabled />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Personal Information</h3>
        <div style={gridStyle}>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input type="tel" name="mobileNumber" className="form-control" value={displayData.mobileNumber} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label className="form-label">Personal Email</label>
            <input type="email" name="personalEmail" className="form-control" value={displayData.personalEmail} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Current Address</label>
            <input type="text" name="currentAddress" className="form-control" value={displayData.currentAddress} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Permanent Address</label>
            <input type="text" name="permanentAddress" className="form-control" value={displayData.permanentAddress} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label className="form-label">Emergency Contact Name</label>
            <input type="text" name="emergencyContactName" className="form-control" value={displayData.emergencyContactName} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label className="form-label">Emergency Contact Number</label>
            <input type="tel" name="emergencyContactNumber" className="form-control" value={displayData.emergencyContactNumber} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label className="form-label">Relationship</label>
            <input type="text" name="relationship" className="form-control" value={displayData.relationship} onChange={handleChange} disabled={!isEditing} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Identity Information</h3>
        <div style={gridStyle}>
          <div className="form-group">
            <label className="form-label">Aadhaar Number</label>
            <input type="text" className="form-control" value={displayData.aadhaarNumber} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">PAN Number</label>
            <input type="text" className="form-control" value={displayData.panNumber} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Passport Number {isEditing && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(Optional)</span>}</label>
            <input type="text" name="passportNumber" className="form-control" value={displayData.passportNumber} onChange={handleChange} disabled={!isEditing} placeholder="Enter Passport Number" />
          </div>
          <div className="form-group">
            <label className="form-label">Driving License Number {isEditing && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(Optional)</span>}</label>
            <input type="text" name="drivingLicenseNumber" className="form-control" value={displayData.drivingLicenseNumber} onChange={handleChange} disabled={!isEditing} placeholder="Enter License Number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
