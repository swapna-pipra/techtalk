import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function setupDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeId TEXT,
      employeeName TEXT,
      employeeCode TEXT,
      department TEXT,
      designation TEXT,
      manager TEXT,
      employmentType TEXT,
      joiningDate TEXT,
      workLocation TEXT,
      employeeStatus TEXT,
      companyEmail TEXT,
      mobileNumber TEXT,
      personalEmail TEXT,
      currentAddress TEXT,
      permanentAddress TEXT,
      emergencyContactName TEXT,
      emergencyContactNumber TEXT,
      relationship TEXT,
      profilePhoto TEXT,
      aadhaarNumber TEXT,
      panNumber TEXT,
      passportNumber TEXT,
      drivingLicenseNumber TEXT
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      day TEXT,
      checkIn TEXT,
      checkOut TEXT,
      totalHours TEXT,
      shift TEXT,
      status TEXT,
      lateBy TEXT,
      earlyExit TEXT,
      workMode TEXT,
      overtime TEXT,
      remarks TEXT
    );

    CREATE TABLE IF NOT EXISTS leave_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      duration TEXT,
      days INTEGER,
      reason TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS holidays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      date TEXT,
      day TEXT,
      type TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );
  `);

  // Seed Profile if empty
  const profileCount = await db.get('SELECT COUNT(*) as count FROM profile');
  if (profileCount.count === 0) {
    await db.run(`
      INSERT INTO profile (
        employeeId, employeeName, employeeCode, department, designation, manager, 
        employmentType, joiningDate, workLocation, employeeStatus, companyEmail, 
        mobileNumber, personalEmail, currentAddress, permanentAddress, emergencyContactName, 
        emergencyContactNumber, relationship, profilePhoto, aadhaarNumber, panNumber, 
        passportNumber, drivingLicenseNumber
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'EMP-1024', 'John Doe', 'JD1024', 'Engineering Dept', 'Software Engineer', 'Sarah Jenkins',
      'Full-Time', 'March 15, 2024', 'New York Office', 'Active', 'john.doe@company.com',
      '+1 (555) 123-4567', 'johndoe.personal@email.com', '123 Main St, Apt 4B, New York, NY 10001',
      '123 Main St, Apt 4B, New York, NY 10001', 'Jane Doe', '+1 (555) 987-6543', 'Spouse',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80',
      '1234 5678 9012', 'ABCDE1234F', '', ''
    ]);
  }

  // Seed Attendance if empty
  const attendanceCount = await db.get('SELECT COUNT(*) as count FROM attendance');
  if (attendanceCount.count === 0) {
    const mockAttendance = [
      { date: 'Jun 13, 2026', day: 'Friday', checkIn: '09:00 AM', checkOut: '--:--', totalHours: '--:--', shift: 'General', status: 'Present', lateBy: '-', earlyExit: '-', workMode: 'Office', overtime: '-', remarks: 'Checked in' },
      { date: 'Jun 12, 2026', day: 'Thursday', checkIn: '09:15 AM', checkOut: '06:00 PM', totalHours: '8h 45m', shift: 'General', status: 'Late', lateBy: '15 mins', earlyExit: '-', workMode: 'Office', overtime: '-', remarks: 'Traffic delay' },
      { date: 'Jun 11, 2026', day: 'Wednesday', checkIn: '09:00 AM', checkOut: '05:30 PM', totalHours: '8h 30m', shift: 'General', status: 'Half Day', lateBy: '-', earlyExit: '30 mins', workMode: 'WFH', overtime: '-', remarks: 'Left early for appointment' },
      { date: 'Jun 10, 2026', day: 'Tuesday', checkIn: '08:50 AM', checkOut: '07:00 PM', totalHours: '10h 10m', shift: 'General', status: 'Present', lateBy: '-', earlyExit: '-', workMode: 'Hybrid', overtime: '1h 10m', remarks: 'Project release' },
      { date: 'Jun 09, 2026', day: 'Monday', checkIn: '--:--', checkOut: '--:--', totalHours: '--:--', shift: 'General', status: 'Absent', lateBy: '-', earlyExit: '-', workMode: '-', overtime: '-', remarks: 'Unplanned leave' },
      { date: 'Jun 08, 2026', day: 'Sunday', checkIn: '--:--', checkOut: '--:--', totalHours: '--:--', shift: 'General', status: 'Holiday', lateBy: '-', earlyExit: '-', workMode: '-', overtime: '-', remarks: 'Weekend' },
      { date: 'May 15, 2026', day: 'Friday', checkIn: '09:00 AM', checkOut: '06:00 PM', totalHours: '9h 00m', shift: 'General', status: 'Present', lateBy: '-', earlyExit: '-', workMode: 'Office', overtime: '-', remarks: '-' },
      { date: 'May 14, 2026', day: 'Thursday', checkIn: '--:--', checkOut: '--:--', totalHours: '--:--', shift: 'General', status: 'Leave', lateBy: '-', earlyExit: '-', workMode: '-', overtime: '-', remarks: 'Sick leave' },
      { date: 'Apr 20, 2026', day: 'Monday', checkIn: '09:30 AM', checkOut: '06:00 PM', totalHours: '8h 30m', shift: 'General', status: 'Late', lateBy: '30 mins', earlyExit: '-', workMode: 'Office', overtime: '-', remarks: 'Car trouble' }
    ];

    for (const a of mockAttendance) {
      await db.run(`
        INSERT INTO attendance (date, day, checkIn, checkOut, totalHours, shift, status, lateBy, earlyExit, workMode, overtime, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [a.date, a.day, a.checkIn, a.checkOut, a.totalHours, a.shift, a.status, a.lateBy, a.earlyExit, a.workMode, a.overtime, a.remarks]);
    }
  }

  // Seed Leave if empty
  const leaveCount = await db.get('SELECT COUNT(*) as count FROM leave_requests');
  if (leaveCount.count === 0) {
    const mockLeaves = [
      { type: 'Annual Leave', duration: 'Jul 4 - Jul 5, 2026', days: 2, reason: 'Family vacation', status: 'Pending' },
      { type: 'Sick Leave', duration: 'May 10, 2026', days: 1, reason: "Doctor's appointment", status: 'Approved' }
    ];

    for (const l of mockLeaves) {
      await db.run(`
        INSERT INTO leave_requests (type, duration, days, reason, status)
        VALUES (?, ?, ?, ?, ?)
      `, [l.type, l.duration, l.days, l.reason, l.status]);
    }
  }

  // Seed Holidays if empty
  const holidayCount = await db.get('SELECT COUNT(*) as count FROM holidays');
  if (holidayCount.count === 0) {
    const holidays = [
      { name: "New Year's Day", date: '01-Jan-2026', day: 'Thursday', type: 'National Holiday' },
      { name: 'Republic Day', date: '26-Jan-2026', day: 'Monday', type: 'National Holiday' },
      { name: 'Independence Day', date: '15-Aug-2026', day: 'Saturday', type: 'National Holiday' },
      { name: 'Gandhi Jayanti', date: '02-Oct-2026', day: 'Friday', type: 'National Holiday' },
      { name: 'Christmas', date: '25-Dec-2026', day: 'Friday', type: 'Festival Holiday' }
    ];

    for (const h of holidays) {
      await db.run(`
        INSERT INTO holidays (name, date, day, type)
        VALUES (?, ?, ?, ?)
      `, [h.name, h.date, h.day, h.type]);
    }
  }

  return db;
}
