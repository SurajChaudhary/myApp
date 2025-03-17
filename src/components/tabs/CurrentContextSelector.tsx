import React, { useState, useEffect } from "react";
import styles from "../../styles/tabs/CurrentContextSelector.module.css";

// Define the interfaces based on your data structure

interface Section {
  sectionId: number;
  sectionName: string;
  sectionCode: string;
  sectionDescription: string;
  value: string;
}

interface WorkPaper {
  workPaperId: number;
  workPaperName: string;
  workPaperCode: string;
  workPaperDescription: string;
  sections: Section[];
}

interface Project {
  projectId: number;
  projectName: string;
  projectCode: string;
  projectDescription: string;
  projectType: string;
  workPapers: WorkPaper[];
}

interface AuditUniverse {
  id: number;
  name: string;
  title: string;
  projects?: Project[];
  assesmentUnits?: any[];
  legalEntities?: any[];
}

interface CurrentContextData {
  auditUniverses: AuditUniverse[];
}

interface CurrentContextSelectorProps {
  data: CurrentContextData;
}

const CurrentContextSelector: React.FC<CurrentContextSelectorProps> = ({
  data,
}) => {
  const { auditUniverses } = data;

  // Initialize selected dropdown values based on first available option (if exists)
  const [selectedAuditUniverseId, setSelectedAuditUniverseId] =
    useState<number>(auditUniverses.length > 0 ? auditUniverses[0].id : 0);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
  const [selectedWorkPaperId, setSelectedWorkPaperId] = useState<number>(0);
  const [selectedSectionId, setSelectedSectionId] = useState<number>(0);

  // Compute the cascading options
  const selectedUniverse = auditUniverses.find(
    (u) => u.id === selectedAuditUniverseId
  );
  const projects = selectedUniverse?.projects || [];
  const selectedProject = projects.find(
    (p) => p.projectId === selectedProjectId
  );
  const workPapers = selectedProject?.workPapers || [];
  const selectedWorkPaper = workPapers.find(
    (w) => w.workPaperId === selectedWorkPaperId
  );
  const sections = selectedWorkPaper?.sections || [];

  // When the selected audit universe changes, update the project dropdown
  useEffect(() => {
    if (
      selectedUniverse &&
      selectedUniverse.projects &&
      selectedUniverse.projects.length > 0
    ) {
      setSelectedProjectId(selectedUniverse.projects[0].projectId);
    } else {
      setSelectedProjectId(0);
    }
  }, [selectedAuditUniverseId, selectedUniverse]);

  // When the selected project changes, update the work paper dropdown
  useEffect(() => {
    if (
      selectedProject &&
      selectedProject.workPapers &&
      selectedProject.workPapers.length > 0
    ) {
      setSelectedWorkPaperId(selectedProject.workPapers[0].workPaperId);
    } else {
      setSelectedWorkPaperId(0);
    }
  }, [selectedProject]);

  // When the selected work paper changes, update the section dropdown
  useEffect(() => {
    if (
      selectedWorkPaper &&
      selectedWorkPaper.sections &&
      selectedWorkPaper.sections.length > 0
    ) {
      setSelectedSectionId(selectedWorkPaper.sections[0].sectionId);
    } else {
      setSelectedSectionId(0);
    }
  }, [selectedWorkPaper]);

  return (
    <div>
      {/* <div className="styles.fieldRow">
        <label htmlFor="auditUniverseSelect">Audit Universe:</label>
        <select
          id="auditUniverseSelect"
          value={selectedAuditUniverseId}
          onChange={(e) => setSelectedAuditUniverseId(Number(e.target.value))}
        >
          {auditUniverses.map((universe) => (
            <option key={universe.id} value={universe.id}>
              {universe.name}
            </option>
          ))}
        </select>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "12px",
        }}
      >
        <label
          htmlFor="auditUniverseSelect"
          style={{
            width: "150px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#c9d1d9",
          }}
        >
          Audit Universe:
        </label>
        <select
          id="auditUniverseSelect"
          value={selectedAuditUniverseId}
          onChange={(e) => setSelectedAuditUniverseId(Number(e.target.value))}
          style={{
            flex: 1,
            padding: "6px 8px",
            border: "1px solid #30363d",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "inherit",
            color: "inherit",
          }}
        >
          {auditUniverses.map((universe) => (
            <option key={universe.id} value={universe.id}>
              {universe.name}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="styles.fieldRow">
        <label htmlFor="projectSelect">Project:</label>
        <select
          id="projectSelect"
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(Number(e.target.value))}
        >
          {projects.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div> */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "12px",
        }}
      >
        <label
          htmlFor="projectSelect"
          style={{
            width: "150px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#c9d1d9",
          }}
        >
          Project :
        </label>
        <select
          id="projectSelect"
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(Number(e.target.value))}
          style={{
            flex: 1,
            padding: "6px 8px",
            border: "1px solid #30363d",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "inherit",
            color: "inherit",
          }}
        >
          {projects.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="styles.fieldRow">
        <label htmlFor="workPaperSelect">Work Paper:</label>
        <select
          id="workPaperSelect"
          value={selectedWorkPaperId}
          onChange={(e) => setSelectedWorkPaperId(Number(e.target.value))}
        >
          {workPapers.map((wp) => (
            <option key={wp.workPaperId} value={wp.workPaperId}>
              {wp.workPaperName}
            </option>
          ))}
        </select>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "12px",
        }}
      >
        <label
          htmlFor="workPaperSelect"
          style={{
            width: "150px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#c9d1d9",
          }}
        >
          Work Paper:
        </label>
        <select
          id="workPaperSelect"
          value={selectedWorkPaperId}
          onChange={(e) => setSelectedWorkPaperId(Number(e.target.value))}
          style={{
            flex: 1,
            padding: "6px 8px",
            border: "1px solid #30363d",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "inherit",
            color: "inherit",
          }}
        >
          {workPapers.map((wp) => (
            <option key={wp.workPaperId} value={wp.workPaperId}>
              {wp.workPaperName}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="styles.fieldRow">
        <label htmlFor="sectionSelect">Section:</label>
        <select
          id="sectionSelect"
          value={selectedSectionId}
          onChange={(e) => setSelectedSectionId(Number(e.target.value))}
        >
          {sections.map((sec) => (
            <option key={sec.sectionId} value={sec.sectionId}>
              {sec.sectionName}
            </option>
          ))}
        </select>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "12px",
        }}
      >
        <label
          htmlFor="sectionSelect"
          style={{
            width: "150px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#c9d1d9",
          }}
        >
          Section:
        </label>
        <select
          id="sectionSelect"
          value={selectedSectionId}
          onChange={(e) => setSelectedSectionId(Number(e.target.value))}
          style={{
            flex: 1,
            padding: "6px 8px",
            border: "1px solid #30363d",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "inherit",
            color: "inherit",
          }}
        >
          {sections.map((sec) => (
            <option key={sec.sectionId} value={sec.sectionId}>
              {sec.sectionName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrentContextSelector;
