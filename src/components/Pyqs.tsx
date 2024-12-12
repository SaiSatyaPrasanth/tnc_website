import React, { useState } from "react";

const Accordion: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Data defined within the component
  const data = [
    {
      exam_name: "1. NORCET (2023)",
      subjects: [
        {
          subject_name: "Medical-Surgical Nursing",
          download: "/sample.pdf",
          file_type: "PDF",
          file_size: "2 MB",
        },
        {
          subject_name: "Pediatric Nursing",
          download: "/sample.pdf",
          file_type: "PDF",
          file_size: "1.5 MB",
        },
      ],
    },
    {
      exam_name: "2. NORCET (2022)",
      subjects: [
        {
          subject_name: "Mental Health Nursing",
          download: "/sample.pdf",
          file_type: "PDF",
          file_size: "3 MB",
        },
      ],
    },
  ];

  const toggleAccordion = (examName: string) => {
    setOpenAccordion((prev) => (prev === examName ? null : examName));
  };

  return (
    <section className="pyq-accordion-section">
      <div className="pyq-container">
        <h2 className="pyq-title">Previous Year Questions</h2>
        <div className="pyq-accordion">
          {data.map((exam, index) => (
            <div className="pyq-accordion-item" key={index}>
              <button
                className="pyq-accordion-header"
                onClick={() => toggleAccordion(exam.exam_name)}
              >
                <span className="pyq-question">{exam.exam_name}</span>
                <span className="pyq-icon">
                  {openAccordion === exam.exam_name ? "-" : "+"}
                </span>
              </button>
              <div
                className={`pyq-accordion-body ${
                  openAccordion === exam.exam_name ? "open" : ""
                }`}
              >
                <table className="pyq-table">
                  <thead>
                    <tr>
                      <th>Subject Name</th>
                      <th>Download</th>
                      <th>File Type</th>
                      <th>File Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.subjects.map((subject, subjectIndex) => (
                      <tr key={subjectIndex}>
                        <td>{subject.subject_name}</td>
                        <td>
                          <a
                            href={subject.download}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pyq-download-link"
                          >
                            {`Download (${subject.file_type})`}
                          </a>
                        </td>
                        <td>{subject.file_type}</td>
                        <td>{subject.file_size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
