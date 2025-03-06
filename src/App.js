import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: ''
    },
    professionalSummary: '',
    workExperience: [],
    education: [],
    skills: [],
    certifications: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const templates = [
    { id: 'modern', name: 'Modern Professional' },
    { id: 'classic', name: 'Classic Design' },
    { id: 'creative', name: 'Creative Layout' }
  ];

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
      }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        graduationYear: '',
        gpa: ''
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuedBy: '',
        date: ''
      }]
    }));
  };

  const handleExport = () => {
    // Placeholder for export functionality
    alert('Export functionality will be implemented');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Resume Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Full Name" 
                value={resumeData.personalInfo.fullName}
                onChange={(e) => setResumeData(prev => ({
                  ...prev, 
                  personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                }))}
              />
              <Input 
                placeholder="Email" 
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData(prev => ({
                  ...prev, 
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
              />
              <Input 
                placeholder="Phone" 
                value={resumeData.personalInfo.phone}
                onChange={(e) => setResumeData(prev => ({
                  ...prev, 
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
              />
              <Input 
                placeholder="Location" 
                value={resumeData.personalInfo.location}
                onChange={(e) => setResumeData(prev => ({
                  ...prev, 
                  personalInfo: { ...prev.personalInfo, location: e.target.value }
                }))}
              />
            </div>
          </TabsContent>

          {/* Professional Summary Tab */}
          <TabsContent value="summary">
            <Textarea 
              placeholder="Write a brief professional summary highlighting your key strengths and career objectives"
              value={resumeData.professionalSummary}
              onChange={(e) => setResumeData(prev => ({
                ...prev, 
                professionalSummary: e.target.value
              }))}
              className="h-40"
            />
          </TabsContent>

          {/* Work Experience Tab */}
          <TabsContent value="work">
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <Input 
                  placeholder="Company" 
                  value={exp.company}
                  onChange={(e) => {
                    const newWorkExp = [...resumeData.workExperience];
                    newWorkExp[index].company = e.target.value;
                    setResumeData(prev => ({ ...prev, workExperience: newWorkExp }));
                  }}
                />
                <Input 
                  placeholder="Position" 
                  value={exp.position}
                  onChange={(e) => {
                    const newWorkExp = [...resumeData.workExperience];
                    newWorkExp[index].position = e.target.value;
                    setResumeData(prev => ({ ...prev, workExperience: newWorkExp }));
                  }}
                />
                <Input 
                  type="date" 
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newWorkExp = [...resumeData.workExperience];
                    newWorkExp[index].startDate = e.target.value;
                    setResumeData(prev => ({ ...prev, workExperience: newWorkExp }));
                  }}
                />
                <Input 
                  type="date" 
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newWorkExp = [...resumeData.workExperience];
                    newWorkExp[index].endDate = e.target.value;
                    setResumeData(prev => ({ ...prev, workExperience: newWorkExp }));
                  }}
                />
                <Textarea 
                  placeholder="Key Responsibilities" 
                  className="col-span-2"
                  value={exp.responsibilities}
                  onChange={(e) => {
                    const newWorkExp = [...resumeData.workExperience];
                    newWorkExp[index].responsibilities = e.target.value;
                    setResumeData(prev => ({ ...prev, workExperience: newWorkExp }));
                  }}
                />
              </div>
            ))}
            <Button onClick={addWorkExperience} variant="outline">
              Add Work Experience
            </Button>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <Input 
                  placeholder="Institution" 
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].institution = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                />
                <Input 
                  placeholder="Degree" 
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].degree = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                />
                <Input 
                  type="number" 
                  placeholder="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].graduationYear = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                />
                <Input 
                  placeholder="GPA" 
                  value={edu.gpa}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].gpa = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                />
              </div>
            ))}
            <Button onClick={addEducation} variant="outline">
              Add Education
            </Button>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            {resumeData.skills.map((skill, index) => (
              <Input 
                key={index}
                placeholder="Enter a skill" 
                className="mb-2"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...resumeData.skills];
                  newSkills[index] = e.target.value;
                  setResumeData(prev => ({ ...prev, skills: newSkills }));
                }}
              />
            ))}
            <Button onClick={addSkill} variant="outline">
              Add Skill
            </Button>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <Input 
                  placeholder="Certification Name" 
                  value={cert.name}
                  onChange={(e) => {
                    const newCerts = [...resumeData.certifications];
                    newCerts[index].name = e.target.value;
                    setResumeData(prev => ({ ...prev, certifications: newCerts }));
                  }}
                />
                <Input 
                  placeholder="Issued By" 
                  value={cert.issuedBy}
                  onChange={(e) => {
                    const newCerts = [...resumeData.certifications];
                    newCerts[index].issuedBy = e.target.value;
                    setResumeData(prev => ({ ...prev, certifications: newCerts }));
                  }}
                />
                <Input 
                  type="date"
                  placeholder="Date" 
                  value={cert.date}
                  onChange={(e) => {
                    const newCerts = [...resumeData.certifications];
                    newCerts[index].date = e.target.value;
                    setResumeData(prev => ({ ...prev, certifications: newCerts }));
                  }}
                />
              </div>
            ))}
            <Button onClick={addCertification} variant="outline">
              Add Certification
            </Button>
          </TabsContent>
        </Tabs>

        {/* Template Selection and Export */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Select Template:</span>
            <Select 
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExport} className="bg-primary text-white">
            Export Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeBuilder;