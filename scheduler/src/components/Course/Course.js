import React from 'react';
import {courseConflict, timeParts} from './times.js';
import 'rbx/index.css';
import { Button } from 'rbx';
import {db} from './../../App.js';

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const buttonColor = selected => (
  selected ? `button is-success is-selected` : 'button'
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
)

const Course = ({ course, state, user }) => (
  <button className={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </button>
  );

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

export default Course;