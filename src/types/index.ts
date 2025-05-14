
export interface Application {
  id: string;
  managerName: string;
  managerContact: string;
  name: string;
  link: string;
  applicationType: string;
  businessFunction: string;
  licenseTypes: LicenseInfo[];
  departmentUsage: DepartmentUsage[];
  totalUsersWithAccess: number;
  thresholdInfo: ThresholdInfo[];
  actualUsage: UsageInfo[];
  usersExceedingThreshold: number;
  notes: string;
}

export interface LicenseInfo {
  type: string;
  count: number;
}

export interface DepartmentUsage {
  department: string;
  licenseCount: number;
}

export interface ThresholdInfo {
  role: string;
  expectedUsage: string;
}

export interface UsageInfo {
  role: string;
  usage: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface ChartData {
  name: string;
  value: number;
}
