
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadApplications, saveApplications } from '../data/mockData';
import { Application } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface ApplicationContextType {
  applications: Application[];
  selectedApp: Application | null;
  setSelectedApp: (app: Application | null) => void;
  addApplication: (app: Application) => void;
  updateApplication: (app: Application) => void;
  deleteApplication: (id: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadedApps = loadApplications();
    setApplications(loadedApps);
  }, []);

  const addApplication = (app: Application) => {
    const newApp = {
      ...app,
      id: Date.now().toString()
    };
    const updatedApps = [...applications, newApp];
    setApplications(updatedApps);
    saveApplications(updatedApps);
    toast({
      title: "Application added",
      description: `${app.name} has been added successfully.`
    });
  };

  const updateApplication = (app: Application) => {
    const updatedApps = applications.map(a => a.id === app.id ? app : a);
    setApplications(updatedApps);
    saveApplications(updatedApps);
    toast({
      title: "Application updated",
      description: `${app.name} has been updated successfully.`
    });
  };

  const deleteApplication = (id: string) => {
    const appToDelete = applications.find(a => a.id === id);
    const updatedApps = applications.filter(a => a.id !== id);
    setApplications(updatedApps);
    saveApplications(updatedApps);
    if (selectedApp?.id === id) {
      setSelectedApp(null);
    }
    toast({
      title: "Application deleted",
      description: `${appToDelete?.name || 'Application'} has been removed.`
    });
  };

  return (
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        selectedApp, 
        setSelectedApp, 
        addApplication, 
        updateApplication, 
        deleteApplication 
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
