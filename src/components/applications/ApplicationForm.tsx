
import { useState, useEffect } from "react";
import { useApplications } from "@/context/ApplicationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applicationTypes, departmentNames } from "@/data/mockData";
import { Application, LicenseInfo, DepartmentUsage, ThresholdInfo, UsageInfo } from "@/types";
import { X, Plus } from "lucide-react";

interface ApplicationFormProps {
  initialData?: Application | null;
  onCancel: () => void;
}

export default function ApplicationForm({ initialData, onCancel }: ApplicationFormProps) {
  const { addApplication, updateApplication } = useApplications();
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<Partial<Application>>({
    managerName: "",
    managerContact: "",
    name: "",
    link: "",
    applicationType: applicationTypes[0],
    businessFunction: "",
    licenseTypes: [{ type: "", count: 0 }],
    departmentUsage: departmentNames.map(dept => ({ department: dept, licenseCount: 0 })),
    thresholdInfo: [{ role: "", expectedUsage: "" }],
    actualUsage: [{ role: "", usage: "" }],
    totalUsersWithAccess: 0,
    usersExceedingThreshold: 0,
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle license types
  const addLicenseType = () => {
    setFormData({
      ...formData,
      licenseTypes: [...(formData.licenseTypes || []), { type: "", count: 0 }],
    });
  };

  const updateLicenseType = (index: number, field: keyof LicenseInfo, value: string | number) => {
    const updatedLicenses = [...(formData.licenseTypes || [])];
    if (field === 'count') {
      updatedLicenses[index][field] = Number(value);
    } else {
      updatedLicenses[index][field] = value as string;
    }
    setFormData({
      ...formData,
      licenseTypes: updatedLicenses,
    });
  };

  const removeLicenseType = (index: number) => {
    const updatedLicenses = [...(formData.licenseTypes || [])];
    updatedLicenses.splice(index, 1);
    setFormData({
      ...formData,
      licenseTypes: updatedLicenses,
    });
  };

  // Handle department usage
  const updateDepartmentUsage = (index: number, value: number) => {
    const updatedDepts = [...(formData.departmentUsage || [])];
    updatedDepts[index].licenseCount = value;
    setFormData({
      ...formData,
      departmentUsage: updatedDepts,
    });
  };

  // Handle threshold info
  const addThresholdInfo = () => {
    setFormData({
      ...formData,
      thresholdInfo: [...(formData.thresholdInfo || []), { role: "", expectedUsage: "" }],
    });
  };

  const updateThresholdInfo = (index: number, field: keyof ThresholdInfo, value: string) => {
    const updatedThresholds = [...(formData.thresholdInfo || [])];
    updatedThresholds[index][field] = value;
    setFormData({
      ...formData,
      thresholdInfo: updatedThresholds,
    });
  };

  const removeThresholdInfo = (index: number) => {
    const updatedThresholds = [...(formData.thresholdInfo || [])];
    updatedThresholds.splice(index, 1);
    setFormData({
      ...formData,
      thresholdInfo: updatedThresholds,
    });
  };

  // Handle actual usage
  const addActualUsage = () => {
    setFormData({
      ...formData,
      actualUsage: [...(formData.actualUsage || []), { role: "", usage: "" }],
    });
  };

  const updateActualUsage = (index: number, field: keyof UsageInfo, value: string) => {
    const updatedUsages = [...(formData.actualUsage || [])];
    updatedUsages[index][field] = value;
    setFormData({
      ...formData,
      actualUsage: updatedUsages,
    });
  };

  const removeActualUsage = (index: number) => {
    const updatedUsages = [...(formData.actualUsage || [])];
    updatedUsages.splice(index, 1);
    setFormData({
      ...formData,
      actualUsage: updatedUsages,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.managerName || !formData.applicationType) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditing && initialData) {
      updateApplication({
        ...initialData,
        ...formData,
      } as Application);
    } else {
      addApplication(formData as Application);
    }
    
    onCancel();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Application" : "Add New Application"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Application Name*</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name || ""} 
                onChange={handleChange} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Application Link</Label>
              <Input 
                id="link" 
                name="link" 
                value={formData.link || ""} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="managerName">Manager Name*</Label>
              <Input 
                id="managerName" 
                name="managerName" 
                value={formData.managerName || ""} 
                onChange={handleChange} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerContact">Manager Contact</Label>
              <Input 
                id="managerContact" 
                name="managerContact" 
                value={formData.managerContact || ""} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="applicationType">Application Type*</Label>
              <Select 
                value={formData.applicationType} 
                onValueChange={(value) => handleSelectChange("applicationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select application type" />
                </SelectTrigger>
                <SelectContent>
                  {applicationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessFunction">Business Function</Label>
              <Input 
                id="businessFunction" 
                name="businessFunction" 
                value={formData.businessFunction || ""} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="totalUsersWithAccess">Total Users with Access</Label>
              <Input 
                id="totalUsersWithAccess" 
                name="totalUsersWithAccess" 
                type="number"
                min="0" 
                value={formData.totalUsersWithAccess || 0} 
                onChange={handleNumberChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usersExceedingThreshold">Users Exceeding Threshold</Label>
              <Input 
                id="usersExceedingThreshold" 
                name="usersExceedingThreshold" 
                type="number"
                min="0" 
                value={formData.usersExceedingThreshold || 0} 
                onChange={handleNumberChange} 
              />
            </div>
          </div>

          {/* License Types */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>License Types</Label>
              <Button type="button" size="sm" variant="outline" onClick={addLicenseType}>
                <Plus className="h-4 w-4 mr-1" /> Add License
              </Button>
            </div>
            {formData.licenseTypes?.map((license, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="License Type"
                    value={license.type}
                    onChange={(e) => updateLicenseType(idx, "type", e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Count"
                    value={license.count}
                    onChange={(e) => updateLicenseType(idx, "count", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLicenseType(idx)}
                  disabled={formData.licenseTypes?.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Department Usage */}
          <div className="space-y-3">
            <Label>Department Usage</Label>
            {formData.departmentUsage?.map((dept, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    value={dept.department}
                    readOnly
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    placeholder="License Count"
                    value={dept.licenseCount}
                    onChange={(e) => updateDepartmentUsage(idx, parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Threshold Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Threshold Information</Label>
              <Button type="button" size="sm" variant="outline" onClick={addThresholdInfo}>
                <Plus className="h-4 w-4 mr-1" /> Add Role
              </Button>
            </div>
            {formData.thresholdInfo?.map((threshold, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Role"
                    value={threshold.role}
                    onChange={(e) => updateThresholdInfo(idx, "role", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Expected Usage (e.g., 2 hrs/day)"
                    value={threshold.expectedUsage}
                    onChange={(e) => updateThresholdInfo(idx, "expectedUsage", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeThresholdInfo(idx)}
                  disabled={formData.thresholdInfo?.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Actual Usage */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Actual Usage</Label>
              <Button type="button" size="sm" variant="outline" onClick={addActualUsage}>
                <Plus className="h-4 w-4 mr-1" /> Add Usage
              </Button>
            </div>
            {formData.actualUsage?.map((usage, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Role"
                    value={usage.role}
                    onChange={(e) => updateActualUsage(idx, "role", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Actual Usage (e.g., 1.5 hrs/day)"
                    value={usage.usage}
                    onChange={(e) => updateActualUsage(idx, "usage", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeActualUsage(idx)}
                  disabled={formData.actualUsage?.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes || ""} 
              onChange={handleChange} 
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Application" : "Add Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
