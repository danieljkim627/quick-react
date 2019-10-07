import React, { useState } from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import Course from './Course';

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const buttonColor = selected => (
  selected ? `button is-success is-selected` : 'button'
);

const CourseList = ({ courses, user }) => {
  const [term, setTerm] = React.useState('Fall');
  const [selected, toggle] = useSelection();
  const termCourses = courses.filter(course => term === getCourseTerm(course));
 
  return (
    <React.Fragment>
      <TermSelector state={ { term, setTerm } } />
      <div className="buttons">
        { termCourses.map(course =>
           <Course key={ course.id } course={ course }
             state={ { selected, toggle } }
             user={ user } />) }
      </div>
    </React.Fragment>
  );
};

const TermSelector = ({ state }) => (
  <div className="field has-addons">
  	{ Object.values(terms)
    	.map(value => 
        <button key={value}
        	className={ buttonColor(value === state.term) }
        	onClick={ () => state.setTerm(value) }
        	>
        	{ value }
        </button>
    	)
  	}
  </div>
);

const useSelection = () => {
  const [selected, setSelected] = React.useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
  };
  return [ selected, toggle ];
};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

export default CourseList;