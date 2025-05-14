
import { useNavigate } from "react-router-dom";
import { useApplications } from "@/context/ApplicationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function RecentApplications() {
  const { applications, setSelectedApp } = useApplications();
  const navigate = useNavigate();

  const recentApplications = [...applications]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  const handleViewClick = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      setSelectedApp(app);
      navigate("/applications");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Applications</CardTitle>
          <Button variant="outline" size="sm" onClick={() => navigate("/applications")}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Manager</TableHead>
              <TableHead className="hidden md:table-cell">Users</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {app.applicationType.includes('SAAS') 
                        ? 'SAAS' 
                        : app.applicationType.includes('Hybrid') 
                          ? 'Hybrid' 
                          : 'On-Premise'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{app.managerName}</TableCell>
                  <TableCell className="hidden md:table-cell">{app.totalUsersWithAccess}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewClick(app.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
