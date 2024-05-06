import React from 'react';
import SalaryButtons from './SalaryButtons';
import InputFields from './InputFields';

const Salary = ({ handleFilterChange }) => {
  return (
    <div>
      {/* Salary filter section */}
      <h4 className="text-lg font-medium mb-2">Salary</h4>

      {/* Salary type buttons */}
      <div className="salary-buttons-container mb-4">
        <SalaryButtons onClickHandler={handleFilterChange} value="Hourly" title="Hourly" />
        <SalaryButtons onClickHandler={handleFilterChange} value="Monthly" title="Monthly" />
        <SalaryButtons onClickHandler={handleFilterChange} value="Yearly" title="Yearly" />
      </div>

      {/* All salaries option */}
      <div>
        <label className="sidebar-label-container">
          <input
            type="checkbox"
            name="salary"
            id="all-salaries"
            value=""
            onChange={(event) => handleFilterChange('salary', event.target.value)}
          />
          <span className="checkmark ml-2"></span>All
        </label>
      </div>

      {/* Salary range options */}
      <div>
        <InputFields
          name="salary"
          handleFilterChange={handleFilterChange}
          value={3000}
          title="< 3000"
        />
      </div>
      <div>
        <InputFields
          name="salary"
          handleFilterChange={handleFilterChange}
          value={5000}
          title="< 5000"
        />
      </div>
      <div>
        <InputFields
          name="salary"
          handleFilterChange={handleFilterChange}
          value={8000}
          title="< 8000"
        />
      </div>
      <div>
        <InputFields
          name="salary"
          handleFilterChange={handleFilterChange}
          value={12000}
          title="< 12000"
        />
      </div>
    </div>
  );
};

export default Salary;