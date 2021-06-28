/*
Copyright (C) 2017 Semester.ly Technologies, LLC

Semester.ly is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Semester.ly is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import React from 'react';
import CourseListRow from './course_list_row';
import * as SemesterlyPropTypes from '../constants/semesterlyPropTypes';

class AdvisingSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mock: null,
    };
  }

  render() {
    const SISImportDataModalButton = (
      <div className="cal-btn-wrapper" style={{ display: 'inline', verticalAlign: 'middle' }}>
        <button
          onClick={() => this.props.triggerSISImportDataModal()}
          data-tip
          className="save-timetable add-button"
          data-for="import-data-btn-tooltip"
        >
          <i className="fa fa-upload" />
        </button>
        <ReactTooltip
          id="import-data-btn-tooltip"
          class="tooltip"
          type="dark"
          place="bottom"
          effect="solid"
        >
          <span>Import SIS Data</span>
        </ReactTooltip>
      </div>
    );

    const emptyState = (this.props.loading_semesters) ? (<div className="empty-state">
      <h4><p>Loading your semesters...</p></h4>
    </div>) : (<div className="empty-state"><h4><p> No semesters yet! </p></h4></div>);

    const AddAdvisorButton = (
      <div className="cal-btn-wrapper" style={{ display: 'inline', verticalAlign: 'middle' }}>
        <button
          onClick={() => this.props.triggerAddAdvisorModal()}
          data-tip
          className="save-timetable add-button"
          data-for="add-advisor-btn-tooltip"
        >
          <i className="fa fa-plus" />
        </button>
        <ReactTooltip
          id="add-advisor-btn-tooltip"
          class="tooltip"
          type="dark"
          place="bottom"
          effect="solid"
        >
          <span>Add a new advisor</span>
        </ReactTooltip>
      </div>
    );

    let courseListRows;
    if (this.props.userInfo.isAdvisor && this.props.selected_advisee === null) {
      courseListRows = (<div className="empty-state">
        <h4 style={{ marginTop: '50%' }}> Click on a Student to see their schedule </h4>
      </div>);
    } else {
      // TODO: get timetable name from invited transcripts if user is advisor
      courseListRows = (this.props.displayed_semesters !== null) ?
      this.props.displayed_semesters.map(semester =>
        (<CourseListRow
          key={semester}
          parentParentCallback={this.props.parentCallback}
          displayed_semester={semester}
          current_semester={`${this.props.semester.name} ${this.props.semester.year}`}
          selected_advisee={this.props.selected_advisee}
          selected_semester={this.props.selected_semester}
          coursesInTimetable={this.props.coursesInTimetable}
          courseToClassmates={this.props.courseToClassmates}
          courseToColourIndex={this.props.courseToColourIndex}
          isCourseInRoster={this.props.isCourseInRoster}
          fetchCourseInfo={this.props.fetchCourseInfo}
          timetableName={this.props.timetableName}
          userInfo={this.props.userInfo}
        />),
      ) : emptyState;
    }
    let scheduleTitle;
    if (this.props.userInfo.isAdvisor && !this.props.selected_advisee) {
      scheduleTitle = (<div className="advising-schedule-header">
        Advising Dashboard - {`${this.props.userInfo.userFirstName} ${this.props.userInfo.userLastName}`}
        &nbsp;&nbsp;&nbsp;
      </div>);
    } else if (this.props.userInfo.isAdvisor && this.props.selected_advisee) {
      scheduleTitle = (<div className="advising-schedule-header">
        Course Summary for {this.props.selected_advisee.owner_name}
        &nbsp;&nbsp;&nbsp;
      </div>);
    } else {
      scheduleTitle = (<div className="advising-schedule-header">
        Course Summary
        &nbsp;&nbsp;&nbsp;
        { SISImportDataModalButton }
        { AddAdvisorButton }
      </div>);
    }

    return (
      <div className="advising-schedule-inner">
        { scheduleTitle }
        { courseListRows }
      </div>
    );
  }
}

AdvisingSchedule.defaultProps = {
  selected_semester: null,
  selected_advisee: null,
  displayed_semesters: null,
  timetableName: null,
};

AdvisingSchedule.propTypes = {
  userInfo: SemesterlyPropTypes.userInfo.isRequired,
  triggerSISImportDataModal: PropTypes.func.isRequired,
  triggerAddAdvisorModal: PropTypes.func.isRequired,
  selected_semester: PropTypes.string,
  displayed_semesters: PropTypes.arrayOf(PropTypes.string),
  coursesInTimetable: PropTypes.arrayOf(SemesterlyPropTypes.denormalizedCourse).isRequired,
  courseToColourIndex: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  courseToClassmates: PropTypes.shape({ '*': SemesterlyPropTypes.classmates }).isRequired,
  parentCallback: PropTypes.func.isRequired,
  isCourseInRoster: PropTypes.func.isRequired,
  fetchCourseInfo: PropTypes.func.isRequired,
  semester: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  timetableName: PropTypes.string,
  selected_advisee: PropTypes.shape({
    owner_name: PropTypes.string,
    owner_jhed: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
      author_name: PropTypes.string,
      content: PropTypes.string,
      timestamp: PropTypes.date,
    })),
    semester_name: PropTypes.string,
    semester_year: PropTypes.string,
  }),
  loading_semesters: PropTypes.bool.isRequired,
};

export default AdvisingSchedule;
