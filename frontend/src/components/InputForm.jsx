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
        <input
          type="text"
          id="skills"
          name="skills"
          className="form-control"
          placeholder=" "
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <label htmlFor="skills">Current Skills (e.g. React, Python)</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="interests"
          name="interests"
          className="form-control"
          placeholder=" "
          value={formData.interests}
          onChange={handleChange}
          required
        />
        <label htmlFor="interests">Interests / Hobbies</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="careerGoal"
          name="careerGoal"
          className="form-control"
          placeholder=" "
          value={formData.careerGoal}
          onChange={handleChange}
          required
        />
        <label htmlFor="careerGoal">Career Goal</label>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? (
          <>
            <div className="spinner"></div> Generating Path...
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
