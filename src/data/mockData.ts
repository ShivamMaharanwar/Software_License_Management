
import { Application } from "../types";

export const applications: Application[] = [
  {
    id: "1",
    managerName: "John Smith",
    managerContact: "john.smith@example.com",
    name: "Salesforce CRM",
    link: "https://salesforce.com",
    applicationType: "SAAS Applications Vendor Managed Cloud",
    businessFunction: "Customer relationship management, sales tracking and reporting",
    licenseTypes: [
      { type: "Admin", count: 5 },
      { type: "Standard User", count: 75 },
      { type: "Platform User", count: 20 }
    ],
    departmentUsage: [
      { department: "Engineering", licenseCount: 15 },
      { department: "Capsules", licenseCount: 12 },
      { department: "Pharmapack", licenseCount: 18 },
      { department: "Inspection", licenseCount: 20 },
      { department: "Scitech", licenseCount: 25 },
      { department: "Vantage", licenseCount: 10 }
    ],
    totalUsersWithAccess: 90,
    thresholdInfo: [
      { role: "Admin", expectedUsage: "3 hrs/day" },
      { role: "Standard User", expectedUsage: "2 hrs/day" },
      { role: "Platform User", expectedUsage: "1 hr/day" }
    ],
    actualUsage: [
      { role: "Admin", usage: "2.5 hrs/day" },
      { role: "Standard User", usage: "1.8 hrs/day" },
      { role: "Platform User", usage: "0.8 hrs/day" }
    ],
    usersExceedingThreshold: 12,
    notes: "Considering upgrading to Enterprise edition next fiscal year."
  },
  {
    id: "2",
    managerName: "Sarah Johnson",
    managerContact: "sarah.johnson@example.com",
    name: "Adobe Creative Cloud",
    link: "https://adobe.com/creativecloud",
    applicationType: "SAAS Applications ACG Managed Cloud",
    businessFunction: "Design, publishing, and multimedia content creation",
    licenseTypes: [
      { type: "Complete", count: 25 },
      { type: "Single App", count: 15 }
    ],
    departmentUsage: [
      { department: "Engineering", licenseCount: 5 },
      { department: "Capsules", licenseCount: 10 },
      { department: "Pharmapack", licenseCount: 12 },
      { department: "Inspection", licenseCount: 3 },
      { department: "Scitech", licenseCount: 7 },
      { department: "Vantage", licenseCount: 3 }
    ],
    totalUsersWithAccess: 40,
    thresholdInfo: [
      { role: "Designer", expectedUsage: "6 hrs/day" },
      { role: "Occasional User", expectedUsage: "2 hrs/day" }
    ],
    actualUsage: [
      { role: "Designer", usage: "5.5 hrs/day" },
      { role: "Occasional User", usage: "1.2 hrs/day" }
    ],
    usersExceedingThreshold: 3,
    notes: "Considering reducing Single App licenses due to low usage."
  },
  {
    id: "3",
    managerName: "Michael Chen",
    managerContact: "michael.chen@example.com",
    name: "Oracle ERP",
    link: "https://oracle.com/erp",
    applicationType: "On Premise Applications",
    businessFunction: "Enterprise resource planning, financial management",
    licenseTypes: [
      { type: "Full Access", count: 10 },
      { type: "Financial User", count: 25 },
      { type: "Self-Service User", count: 150 }
    ],
    departmentUsage: [
      { department: "Engineering", licenseCount: 20 },
      { department: "Capsules", licenseCount: 35 },
      { department: "Pharmapack", licenseCount: 45 },
      { department: "Inspection", licenseCount: 30 },
      { department: "Scitech", licenseCount: 40 },
      { department: "Vantage", licenseCount: 15 }
    ],
    totalUsersWithAccess: 185,
    thresholdInfo: [
      { role: "Admin", expectedUsage: "4 hrs/day" },
      { role: "Finance Team", expectedUsage: "5 hrs/day" },
      { role: "Employee", expectedUsage: "0.5 hrs/day" }
    ],
    actualUsage: [
      { role: "Admin", usage: "3.2 hrs/day" },
      { role: "Finance Team", usage: "4.7 hrs/day" },
      { role: "Employee", usage: "0.2 hrs/day" }
    ],
    usersExceedingThreshold: 0,
    notes: "System scheduled for upgrade in Q3."
  },
  {
    id: "4",
    managerName: "Emily Rodriguez",
    managerContact: "emily.rodriguez@example.com",
    name: "Microsoft 365",
    link: "https://microsoft.com/microsoft-365",
    applicationType: "Hybrid Applications",
    businessFunction: "Productivity suite, email, document management",
    licenseTypes: [
      { type: "E5", count: 50 },
      { type: "E3", count: 250 },
      { type: "F3", count: 100 }
    ],
    departmentUsage: [
      { department: "Engineering", licenseCount: 80 },
      { department: "Capsules", licenseCount: 60 },
      { department: "Pharmapack", licenseCount: 75 },
      { department: "Inspection", licenseCount: 65 },
      { department: "Scitech", licenseCount: 85 },
      { department: "Vantage", licenseCount: 35 }
    ],
    totalUsersWithAccess: 390,
    thresholdInfo: [
      { role: "Executive", expectedUsage: "6 hrs/day" },
      { role: "Knowledge Worker", expectedUsage: "7 hrs/day" },
      { role: "Frontline Worker", expectedUsage: "2 hrs/day" }
    ],
    actualUsage: [
      { role: "Executive", usage: "5.8 hrs/day" },
      { role: "Knowledge Worker", usage: "6.9 hrs/day" },
      { role: "Frontline Worker", usage: "1.6 hrs/day" }
    ],
    usersExceedingThreshold: 25,
    notes: "License optimization project in progress."
  },
  {
    id: "5",
    managerName: "Robert Lee",
    managerContact: "robert.lee@example.com",
    name: "SAP Business One",
    link: "https://sap.com/business-one",
    applicationType: "On Premise Applications",
    businessFunction: "ERP for small to medium businesses",
    licenseTypes: [
      { type: "Professional", count: 15 },
      { type: "Limited", count: 35 }
    ],
    departmentUsage: [
      { department: "Engineering", licenseCount: 8 },
      { department: "Capsules", licenseCount: 12 },
      { department: "Pharmapack", licenseCount: 10 },
      { department: "Inspection", licenseCount: 7 },
      { department: "Scitech", licenseCount: 9 },
      { department: "Vantage", licenseCount: 4 }
    ],
    totalUsersWithAccess: 48,
    thresholdInfo: [
      { role: "Manager", expectedUsage: "4 hrs/day" },
      { role: "Staff", expectedUsage: "5 hrs/day" }
    ],
    actualUsage: [
      { role: "Manager", usage: "3.5 hrs/day" },
      { role: "Staff", usage: "4.2 hrs/day" }
    ],
    usersExceedingThreshold: 2,
    notes: "Considering cloud migration in next fiscal year."
  }
];

export const applicationTypes = [
  "SAAS Applications Vendor Managed Cloud",
  "SAAS Applications ACG Managed Cloud",
  "On Premise Applications",
  "Hybrid Applications"
];

export const departmentNames = [
  "Engineering",
  "Capsules",
  "Pharmapack",
  "Inspection",
  "Scitech",
  "Vantage"
];

export const defaultUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123",
    name: "Admin User"
  }
];

// Local storage helper functions
export const loadApplications = (): Application[] => {
  const stored = localStorage.getItem('applications');
  return stored ? JSON.parse(stored) : applications;
};

export const saveApplications = (data: Application[]): void => {
  localStorage.setItem('applications', JSON.stringify(data));
};

export const loadUsers = () => {
  const stored = localStorage.getItem('users');
  return stored ? JSON.parse(stored) : defaultUsers;
};

export const saveUsers = (users: any[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};
