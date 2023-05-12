import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filter = props => {
  const {onSelectCheckBox, onSelectSalaryRange, activeSalaryRange} = props

  const onChangeCheckBox = event => {
    onSelectCheckBox(event.target.value, event.target.checked)
  }

  const onChangeRadioBtn = event => {
    onSelectSalaryRange(event.target.value)
  }

  return (
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachItem => (
          <li className="employment-list-item" key={eachItem.employmentTypeId}>
            <input
              className="check-box"
              id={eachItem.employmentTypeId}
              onChange={onChangeCheckBox}
              value={eachItem.employmentTypeId}
              type="checkbox"
            />
            <label className="label-text" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="salary-list-container">
        {salaryRangesList.map(eachItem => (
          <li className="salary-list-item" key={eachItem.salaryRangeId}>
            <input
              className="radio-btn"
              id={eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              type="radio"
              onChange={onChangeRadioBtn}
              checked={eachItem.salaryRangeId === activeSalaryRange}
            />
            <label className="label-text" htmlFor={eachItem.salaryRangeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filter
