import React from 'react';
import SalaryButtons from './SalaryButtons';
import InputFields from './InputFields';

const Salary = ({ handleChange, handleClick }) => {
 return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='salary-buttons-container mb-4'> {/* Added a class for styling */}
        <SalaryButtons onClickHandler={handleClick} value="Hourly" title="Hourly"/>
        <SalaryButtons onClickHandler={handleClick} value="Monthly" title="Monthly"/>
        <SalaryButtons onClickHandler={handleClick} value="Yearly" title="Yearly"/>
      </div>

      <div>
        <label className="sidebar-label-container">
          <input 
            type="radio" 
            name='test' 
            id='test' 
            value="" 
            onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>

        <InputFields 
          name='test' 
          handleChange={handleChange} 
          value={30000} 
          title="&lt; 30000"
        />
        <InputFields 
          name='test' 
          handleChange={handleChange} 
          value={50000} 
          title="&lt; 50000"
        />
        <InputFields 
          name='test' 
          handleChange={handleChange} 
          value={80000} 
          title="&lt; 80000"
        />
        <InputFields 
          name='test' 
          handleChange={handleChange} 
          value={100000} 
          title="&lt; 100000"
        />
      </div>
    </div>
 );
};

export default Salary;
