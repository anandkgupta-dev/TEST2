import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const InputForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    skills: '',
    interests: '',
    careerGoal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.skills && formData.interests && formData.careerGoal) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="skills">Current Skills</label>
        <input
          type="text"
          id="skills"
          name="skills"
          className="form-control"
          placeholder="e.g. HTML, CSS, basic JavaScript"
          value={formData.skills}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="interests">Interests / Hobbies</label>
        <input
          type="text"
          id="interests"
          name="interests"
          className="form-control"
          placeholder="e.g. Design, problem solving, video games"
          value={formData.interests}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="careerGoal">Career Goal</label>
        <input
          type="text"
          id="careerGoal"
          name="careerGoal"
          className="form-control"
          placeholder="e.g. Become a Full-Stack Web Developer"
          value={formData.careerGoal}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? (
          <>
            <div className="spinner"></div> Processing...
          </>
        ) : (
          <>
            <FaPaperPlane /> Generate Recommendations
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;
