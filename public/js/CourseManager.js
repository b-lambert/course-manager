var CourseManager = React.createClass({
  render: function() {
    var context = this;
    var courseNodes = $.map(this.state.data.courses, function(course) {
      return (
        <div>
          <Course
            addDropCourse={context.addDropCourse}
            registeredCourses={context.state.registeredCourses}
            course={course}
          />
        </div>
      );
    });

    return (
      <div >
        <div className="courseList col s6 m4 l2">
        <h3>All Courses</h3>
          {courseNodes}
        </div>
        <div className="col s6 m8 l10">
          <Calendar addDropCourse={this.addDropCourse} registeredCourses={this.state.registeredCourses} />
        </div>
      </div>
    );
  },

  addDropCourse: function(newCourse){
    var registeredCourses = this.state.registeredCourses;
    for(var i = 0; i < newCourse["dayIndex"].length; i++) {
      var coursesInDay = registeredCourses[newCourse["dayIndex"][i]-1];
      // If a course is already registered, remove it.
      if(coursesInDay[newCourse["name"]] !== undefined) {
        delete(coursesInDay[newCourse["name"]]);
        newCourse["active"] = false;
      }
      else {
        // Check for conflicts, return if there is one.
        var newCourseStart = newCourse["timeIndex"][0];
        var newCourseEnd = newCourse["timeIndex"][1];
        for (var courseName in coursesInDay) {
          if (coursesInDay.hasOwnProperty(courseName)) {
            var registeredCourseStart = coursesInDay[courseName]["timeIndex"][0];
            var registeredCourseEnd = coursesInDay[courseName]["timeIndex"][1];
            if((registeredCourseEnd > newCourseStart && registeredCourseStart < newCourseStart) ||
              (registeredCourseStart > newCourseEnd && registeredCourseEnd < newCourseEnd) ||
              (registeredCourseStart == newCourseStart && registeredCourseEnd == newCourseEnd) ||
              (registeredCourseStart > newCourseStart && registeredCourseStart < newCourseEnd)
            ) {
              Materialize.toast("Could not register for this course due to a schedule conflict with " + courseName, 4000);
              return;
            }
          }
        }
        // Otherwise add the coure.
        newCourse["active"] = true;
        coursesInDay[newCourse["name"]] = newCourse;
      }
      registeredCourses[newCourse["name"]] = newCourse;
    }
    this.setState({registeredCourses: registeredCourses});
  },

  getInitialState: function(){
    // registeredCourses will contain an array of hashes, each representing the registered courses for each day.
    return({data: {}, registeredCourses: [{},{},{},{},{}]});
  },

  componentDidMount: function() {
    var context = this;
    $.ajax({
      url: "/courses",
      dataType: "json",
      type: "GET",
      success: function(data){
        context.setState({data: data});
      },
      fail: function(err) {
        Materialize.toast("Could not load courses, please try again later.", 4000);
      }
    });
  }
});
