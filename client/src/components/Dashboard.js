import React from 'react';
import { Link } from 'react-router-dom'; //we use react router dom because we are working inside the browser
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  //we want to use a Link tag instead of an anker tag to navigate

  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;