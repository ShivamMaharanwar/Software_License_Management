
import { useApplications } from "@/context/ApplicationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface ApplicationDetailProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ApplicationDetail({ onEdit, onDelete }: ApplicationDetailProps) {
  const { selectedApp } = useApplications();

  if (!selectedApp) return null;

  const licenseChartData = selectedApp.licenseTypes.map(license => ({
    name: license.type,
    value: license.count
  }));

  const departmentChartData = selectedApp.departmentUsage.map(dept => ({
    name: dept.department,
    value: dept.licenseCount
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{selectedApp.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge>{selectedApp.applicationType}</Badge>
            <a
              href={selectedApp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Visit Application
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base font-medium">{selectedApp.managerName}</div>
            <div className="text-sm text-muted-foreground">{selectedApp.managerContact}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedApp.totalUsersWithAccess}</div>
            <div className="text-sm text-muted-foreground">with access</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Users Exceeding Threshold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedApp.usersExceedingThreshold}</div>
            <div className="text-sm text-muted-foreground">above usage threshold</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Business Function</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{selectedApp.businessFunction || "No business function specified."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>License Distribution</CardTitle>
            <CardDescription>
              Breakdown of license types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={licenseChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {licenseChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <Separator className="my-4" />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Type</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedApp.licenseTypes.map((license, index) => (
                  <TableRow key={index}>
                    <TableCell>{license.type}</TableCell>
                    <TableCell className="text-right">{license.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>
              Licenses per department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {departmentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <Separator className="my-4" />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">License Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedApp.departmentUsage.map((dept, index) => (
                  <TableRow key={index}>
                    <TableCell>{dept.department}</TableCell>
                    <TableCell className="text-right">{dept.licenseCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Thresholds</CardTitle>
            <CardDescription>
              Expected usage per role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Expected Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedApp.thresholdInfo.map((threshold, index) => (
                  <TableRow key={index}>
                    <TableCell>{threshold.role}</TableCell>
                    <TableCell className="text-right">{threshold.expectedUsage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actual Usage</CardTitle>
            <CardDescription>
              Current usage metrics per role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actual Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedApp.actualUsage.map((usage, index) => (
                  <TableRow key={index}>
                    <TableCell>{usage.role}</TableCell>
                    <TableCell className="text-right">{usage.usage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedApp.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{selectedApp.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
