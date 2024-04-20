import React from 'react';
import SalaryButtons from './SalaryButtons';
import InputFields from './InputFields';

const Salary = ({ handleFilterChange }) => {
 return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='salary-buttons-container mb-4'> {/* Added a class for styling */}
        <SalaryButtons onClickHandler={handleFilterChange} value="Hourly" title="Hourly"/>
        <SalaryButtons onClickHandler={handleFilterChange} value="Monthly" title="Monthly"/>
        <SalaryButtons onClickHandler={handleFilterChange} value="Yearly" title="Yearly"/>
      </div>

      <div>
        <label className="sidebar-label-container">
          <input 
            type="radio" 
            name='salary' 
            id='all-salaries' 
            value="" 
            onChange={(event) => handleFilterChange('salary', event.target.value)} />
          <span className='checkmark ml-2'></span>All
        </label>
      </div>
      <div>
        <InputFields 
          name='salary' 
          handleFilterChange={handleFilterChange} 
          value={3000} 
          title="&lt; 3000"
        />
      </div>
      <div>
        <InputFields 
          name='salary' 
          handleFilterChange={handleFilterChange} 
          value={5000} 
          title="&lt; 5000"
        />
      </div>
      <div>
        <InputFields 
          name='salary' 
          handleFilterChange={handleFilterChange} 
          value={8000} 
          title="&lt; 8000"
        />
      </div>
      <div>
        <InputFields 
          name='salary' 
          handleFilterChange={handleFilterChange} 
          value={12000} 
          title="&lt; 12000"
        />
      </div>
    </div>
 );
};

export default Salary;
