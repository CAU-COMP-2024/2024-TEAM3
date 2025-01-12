import React, { useState } from "react";

const TeamMenu = () => {
  const [projects, setProjects] = useState([
    { name: "프로젝트 1", subItems: ["역할 분담", "회의 일정", "회의 내용"] },
    { name: "프로젝트 2", subItems: ["역할 분담", "회의 일정", "회의 내용"] },
  ]);

  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [showProjectInput, setShowProjectInput] = useState(false);

  const addProject = (name) => {
    if (name.trim() === "") {
      alert("프로젝트 이름을 입력해주세요!");
      return;
    }
    setProjects([
      ...projects,
      { name, subItems: ["역할 분담", "회의 일정", "회의 내용"] },
    ]);
    setNewProjectName("");
    setShowProjectInput(false);
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const updateProjectName = (index, newName) => {
    if (newName.trim() === "") {
      alert("프로젝트 이름을 입력해주세요!");
      return;
    }
    const updatedProjects = [...projects];
    updatedProjects[index].name = newName;
    setProjects(updatedProjects);
    setEditingProjectIndex(null);
  };

  return (
    <div>
      <h3>팀플용</h3>
      {projects.map((project, projectIndex) => (
        <div key={projectIndex} style={{ marginBottom: "20px" }}>
          <h4 style={{ position: "relative", display: "inline-block" }}>
            {editingProjectIndex === projectIndex ? (
              <span>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="새 프로젝트 이름"
                  style={{
                    fontSize: "16px",
                    padding: "4px",
                    marginRight: "5px",
                  }}
                />
                <button
                  onClick={() => updateProjectName(projectIndex, editValue)}
                  style={{
                    marginRight: "5px",
                    cursor: "pointer",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "3px 6px",
                  }}
                >
                  저장
                </button>
                <button
                  onClick={() => setEditingProjectIndex(null)}
                  style={{
                    cursor: "pointer",
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "3px 6px",
                  }}
                >
                  취소
                </button>
              </span>
            ) : (
              <span>
                {project.name}{" "}
                <button
                  onClick={() => {
                    setEditingProjectIndex(projectIndex);
                    setEditValue(project.name);
                  }}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "blue",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => deleteProject(projectIndex)}
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  삭제
                </button>
              </span>
            )}
          </h4>
          <ul style={{ paddingLeft: "20px" }}>
            {project.subItems.map((subItem, subItemIndex) => (
              <li key={subItemIndex}>{subItem}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={() => setShowProjectInput(true)}
        style={{
          marginTop: "10px",
          cursor: "pointer",
          padding: "5px 10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        + 프로젝트 추가
      </button>
      {showProjectInput && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="새 프로젝트 이름"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            onClick={() => addProject(newProjectName)}
            style={{
              cursor: "pointer",
              padding: "5px 10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            추가
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamMenu;
