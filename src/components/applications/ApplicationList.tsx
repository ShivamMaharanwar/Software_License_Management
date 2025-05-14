
import { useState } from "react";
import { useApplications } from "@/context/ApplicationContext";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applicationTypes } from "@/data/mockData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ApplicationListProps {
  onEdit: (id: string) => void;
}

export default function ApplicationList({ onEdit }: ApplicationListProps) {
  const { applications, setSelectedApp, deleteApplication } = useApplications();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);

  const handleViewClick = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      setSelectedApp(app);
    }
  };

  const handleDeleteClick = (appId: string) => {
    setAppToDelete(appId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (appToDelete) {
      deleteApplication(appToDelete);
      setDeleteConfirmOpen(false);
      setAppToDelete(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const nameMatch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     app.managerName.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = filterType ? app.applicationType === filterType : true;
    return nameMatch && typeMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={filterType}
          onValueChange={setFilterType}
        >
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="All application types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All application types</SelectItem>
            {applicationTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Manager</TableHead>
              <TableHead className="hidden md:table-cell">Total Users</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
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
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewClick(app.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(app.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(app.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              application and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
