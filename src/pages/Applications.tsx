
import { useState } from "react";
import { useApplications } from "@/context/ApplicationContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ApplicationList from "@/components/applications/ApplicationList";
import ApplicationDetail from "@/components/applications/ApplicationDetail";
import ApplicationForm from "@/components/applications/ApplicationForm";

export default function Applications() {
  const { applications, selectedApp, setSelectedApp } = useApplications();
  const [showForm, setShowForm] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);

  const handleAddNew = () => {
    setSelectedApp(null);
    setEditingAppId(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setEditingAppId(id);
    const app = applications.find(a => a.id === id);
    if (app) {
      setSelectedApp(app);
    }
    setShowForm(true);
  };

  const handleDelete = () => {
    setSelectedApp(null);
    setEditingAppId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    if (editingAppId) {
      setEditingAppId(null);
    }
  };

  const initialData = editingAppId 
    ? applications.find(app => app.id === editingAppId) || null
    : null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      {showForm ? (
        <ApplicationForm initialData={initialData} onCancel={handleCancel} />
      ) : selectedApp ? (
        <ApplicationDetail onEdit={() => setShowForm(true)} onDelete={handleDelete} />
      ) : (
        <ApplicationList onEdit={handleEdit} />
      )}
    </div>
  );
}
