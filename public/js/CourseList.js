var CourseList = React.createClass({
  render: function() {
    var that = this;
    var courseNodes = $.map(this.props.data["courses"], function(course) {
      return (
        <div>
          <Course key={course["id"]} addDropCourse={that.addDropCourse} registeredCourses={that.state.registeredCourses} course={course}/>
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
          <Calendar registeredCourses={this.state.registeredCourses} />
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
              return false;
            }
          }
        }
        // Otherwise add the coure.
        newCourse["active"] = true;
        coursesInDay[newCourse["name"]] = newCourse;
      }
      // for (var key in coursesInDay) {
      //   if (dictionary.hasOwnProperty(key)) {
      //     keys.push(key);
      //   }
      // }
      // for(var j = 0; j < coursesInDay.length; j++) {
      //   var indexToInsert = null;
      //   // TODO Move this into a function
      //
      //   var newCourseStart = newCourse["timeIndex"][0];
      //   var newCourseEnd = newCourse["timeIndex"][1];
      //   var registeredCourseStart = coursesInDay[j]["timeIndex"][0];
      //   var registeredCourseEnd = coursesInDay[j]["timeIndex"][1];
      //
      //   if((registeredCourseEnd > newCourseStart && registeredCourseStart < newCourseStart) ||
      //     (registeredCourseStart > newCourseEnd && registeredCourseEnd < newCourseEnd) ||
      //     (registeredCourseStart == newCourseStart && registeredCourseEnd == newCourseEnd) ||
      //     (registeredCourseStart > newCourseStart && registeredCourseStart < newCourseEnd)
      //   ) {
      //     Materialize.toast("Could not register for this course due to a schedule conflict with " + coursesInDay[j]["name"], 4000);
      //     return false;
      //   }
      // }
      registeredCourses[newCourse["name"]] = newCourse;
    }
    this.setState({registeredCourses: registeredCourses});
    return true;
  },
  getInitialState: function(){
    return({registeredCourses: [{},{},{},{},{}] });
  }
});
