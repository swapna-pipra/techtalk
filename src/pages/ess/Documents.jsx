import React, { useState } from 'react';
import { Download, Eye, ChevronDown, ChevronUp, FileText, Briefcase, CreditCard, BookOpen } from 'lucide-react';

const documentCategories = [
  {
    id: 'employment',
    title: 'Employment Documents',
    icon: <Briefcase size={20} style={{ color: 'var(--primary)' }} />,
    docs: [
      { name: 'Offer Letter', date: 'Mar 10, 2024', size: '1.2 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Appointment Letter', date: 'Mar 15, 2024', size: '1.5 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Employment Contract', date: 'Mar 15, 2024', size: '2.1 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]
  },
  {
    id: 'payroll',
    title: 'Payroll Documents',
    icon: <CreditCard size={20} style={{ color: 'var(--success)' }} />,
    docs: [
      { name: 'Monthly Payslips', date: 'Updated Monthly', size: '4.5 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Salary Revision Letter', date: 'Jan 01, 2026', size: '0.8 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Bonus Statement', date: 'Dec 15, 2025', size: '1.1 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]
  },
  {
    id: 'tax',
    title: 'Tax Documents',
    icon: <FileText size={20} style={{ color: 'var(--warning)' }} />,
    docs: [
      { name: 'Form 16', date: 'Apr 30, 2026', size: '3.2 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Tax Declaration Proof', date: 'Feb 15, 2026', size: '2.5 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Investment Declaration Summary', date: 'Mar 01, 2026', size: '1.8 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]
  },
  {
    id: 'policies',
    title: 'Company Policies',
    icon: <BookOpen size={20} style={{ color: 'var(--info)' }} />,
    docs: [
      { name: 'Employee Handbook', date: 'Jan 01, 2026', size: '5.6 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Leave Policy', date: 'Jan 01, 2026', size: '1.4 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Code of Conduct', date: 'Jan 01, 2026', size: '2.0 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'IT Policy', date: 'Jan 01, 2026', size: '1.7 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]
  }
];

const Documents = () => {
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [openCategories, setOpenCategories] = useState({
    employment: true, // open by default
    payroll: false,
    tax: false,
    policies: false
  });

  const toggleCategory = (id) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1>My Documents</h1>
        <p className="text-muted">Securely view and download your official company records.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {documentCategories.map((category) => (
          <div key={category.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Accordion Header */}
            <div 
              onClick={() => toggleCategory(category.id)}
              style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer',
                backgroundColor: openCategories[category.id] ? 'var(--surface)' : 'var(--background)',
                borderBottom: openCategories[category.id] ? '1px solid var(--border)' : 'none',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  {category.icon}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.125rem' }}>{category.title}</h2>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                {openCategories[category.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            {/* Accordion Body */}
            {openCategories[category.id] && (
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {category.docs.map((doc, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '1rem 1.25rem', 
                        border: '1px solid var(--border)', 
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--background)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FileText size={24} style={{ color: 'var(--text-muted)' }} />
                        <div>
                          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem' }}>{doc.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF • {doc.size} • {doc.date}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {doc.name === 'Monthly Payslips' ? (
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                            onClick={() => setShowPayslipModal(true)}
                          >
                            <Eye size={16} /> <span style={{ fontSize: '0.875rem' }}>View All</span>
                          </button>
                        ) : (
                          <a 
                            href={doc.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-secondary" 
                            style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', textDecoration: 'none' }}
                          >
                            <Eye size={16} /> <span style={{ fontSize: '0.875rem' }}>Open</span>
                          </a>
                        )}
                        <a 
                          href={doc.url} 
                          download={`${doc.name.replace(/ /g, '_')}.pdf`}
                          className="btn btn-primary" 
                          style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', textDecoration: 'none' }}
                        >
                          <Download size={16} /> <span style={{ fontSize: '0.875rem' }}>Download</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payslip History Modal */}
      {showPayslipModal && (
        <div className="animate-fade-in" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={24} color="var(--primary)" /> Payslip History
              </h2>
              <button 
                onClick={() => setShowPayslipModal(false)}
                className="btn btn-secondary"
                style={{ padding: '0.5rem', borderRadius: '50%' }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
              {[
                { month: 'May 2026', size: '1.2 MB' },
                { month: 'April 2026', size: '1.1 MB' },
                { month: 'March 2026', size: '1.2 MB' },
                { month: 'February 2026', size: '1.1 MB' },
                { month: 'January 2026', size: '1.3 MB' },
                { month: 'December 2025', size: '1.4 MB' },
              ].map((slip, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>Payslip - {slip.month}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF • {slip.size}</span>
                  </div>
                  <a 
                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                    download={`Payslip_${slip.month.replace(/ /g, '_')}.pdf`}
                    className="btn btn-primary" 
                    style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}
                  >
                    <Download size={16} /> <span style={{ fontSize: '0.875rem' }}>Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Documents;
