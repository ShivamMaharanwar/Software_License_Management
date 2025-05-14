
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplications } from "@/context/ApplicationContext";
import { Application, ChartData } from "@/types";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function DashboardCharts() {
  const { applications } = useApplications();
  const [selectedApp, setSelectedApp] = useState<string>("all");
  const [typeData, setTypeData] = useState<ChartData[]>([]);
  const [departmentData, setDepartmentData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (applications.length === 0) return;

    // Setup application type chart data
    if (selectedApp === "all") {
      const appTypes: Record<string, number> = {};
      applications.forEach(app => {
        if (appTypes[app.applicationType]) {
          appTypes[app.applicationType]++;
        } else {
          appTypes[app.applicationType] = 1;
        }
      });
      
      setTypeData(
        Object.entries(appTypes).map(([name, value]) => ({
          name,
          value
        }))
      );

      // Setup department usage chart data for all apps
      const deptData: Record<string, number> = {};
      applications.forEach(app => {
        app.departmentUsage.forEach(dept => {
          if (deptData[dept.department]) {
            deptData[dept.department] += dept.licenseCount;
          } else {
            deptData[dept.department] = dept.licenseCount;
          }
        });
      });

      setDepartmentData(
        Object.entries(deptData).map(([name, value]) => ({
          name,
          value
        }))
      );
    } else {
      const app = applications.find(a => a.id === selectedApp);
      if (app) {
        // For a single app, we'll show license types in the pie chart
        setTypeData(
          app.licenseTypes.map(lt => ({
            name: lt.type,
            value: lt.count
          }))
        );

        // And department usage in the bar chart
        setDepartmentData(
          app.departmentUsage.map(dept => ({
            name: dept.department,
            value: dept.licenseCount
          }))
        );
      }
    }
  }, [applications, selectedApp]);

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <CardTitle>License Distribution</CardTitle>
            <Select
              value={selectedApp}
              onValueChange={setSelectedApp}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Applications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                {applications.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedApp === "all" 
              ? "Distribution of application types" 
              : "Distribution of license types"}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Department Usage</CardTitle>
          <p className="text-sm text-muted-foreground">
            License usage across departments
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={departmentData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Licenses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
