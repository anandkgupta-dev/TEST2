import { FaBookOpen, FaRoute, FaCertificate, FaInfoCircle } from 'react-icons/fa';

const RecommendationDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="results-container">
      {/* Recommended Courses */}
      {data.courses && data.courses.length > 0 && (
        <section>
          <h2 className="section-title">
            <FaBookOpen /> Recommended Courses
          </h2>
          <div className="card-grid">
            {data.courses.map((course, idx) => (
              <div key={idx} className="recommendation-card">
                <h3 className="card-header">{course.title}</h3>
                <div className="card-body">
                  <p>{course.description}</p>
                </div>
                <div className="why-suitable">
                  <h4><FaInfoCircle /> Why this is suitable</h4>
                  <p>{course.whySuitable}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Learning Paths */}
      {data.learningPaths && data.learningPaths.length > 0 && (
        <section>
          <h2 className="section-title">
            <FaRoute /> Learning Paths
          </h2>
          <div className="card-grid">
            {data.learningPaths.map((path, idx) => (
              <div key={idx} className="recommendation-card">
                <h3 className="card-header">{path.title}</h3>
                <div className="card-body">
                  <ul className="step-list">
                    {path.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="step-item">{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="why-suitable">
                  <h4><FaInfoCircle /> Why this is suitable</h4>
                  <p>{path.whySuitable}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section>
          <h2 className="section-title">
            <FaCertificate /> Recommended Certifications
          </h2>
          <div className="card-grid">
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="recommendation-card">
                <h3 className="card-header">{cert.title}</h3>
                <div className="card-body">
                  <span className="tag">{cert.provider}</span>
                </div>
                <div className="why-suitable">
                  <h4><FaInfoCircle /> Why this is suitable</h4>
                  <p>{cert.whySuitable}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RecommendationDisplay;
