import React, { useState, useEffect } from "react";

const Accordion: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]); // Use state to store API response data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.120:8012/api/method/course_management.course_management.doctype.pyq.pyq.get_all_pyq");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.message); // Update the data state with the response
      } catch (error: any) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const toggleAccordion = (examName: string) => {
    setOpenAccordion((prev) => (prev === examName ? null : examName));
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetch fails
  }

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
                            href={`http://192.168.1.120:8012/${subject.download}`}
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
