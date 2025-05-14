
import { useApplications } from "@/context/ApplicationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardStats() {
  const { applications } = useApplications();

  // Calculate total licenses and usage
  const totalLicenses = applications.reduce((sum, app) => {
    return sum + app.licenseTypes.reduce((licSum, lic) => licSum + lic.count, 0);
  }, 0);

  const totalUsers = applications.reduce((sum, app) => sum + app.totalUsersWithAccess, 0);

  const usagePercentage = totalLicenses > 0 
    ? Math.round((totalUsers / totalLicenses) * 100) 
    : 0;

  const totalApps = applications.length;

  const usersExceeding = applications.reduce((sum, app) => sum + app.usersExceedingThreshold, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApps}</div>
          <p className="text-xs text-muted-foreground">
            Across all application types
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLicenses}</div>
          <p className="text-xs text-muted-foreground">
            Available software licenses
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">License Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usagePercentage}%</div>
          <div className="mt-2">
            <Progress value={usagePercentage} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {totalUsers} users assigned out of {totalLicenses} licenses
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Users Exceeding Threshold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usersExceeding}</div>
          <p className="text-xs text-muted-foreground">
            Users exceeding usage threshold
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
