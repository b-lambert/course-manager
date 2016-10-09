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
      for(var j = 0; j < coursesInDay.length; j++) {
        var indexToInsert = null;
        // TODO Move this into a function

        var newCourseStart = newCourse["timeIndex"][0];
        var newCourseEnd = newCourse["timeIndex"][1];
        var registeredCourseStart = coursesInDay[j]["timeIndex"][0];
        var registeredCourseEnd = coursesInDay[j]["timeIndex"][1];

        if((registeredCourseEnd > newCourseStart && registeredCourseStart < newCourseStart) ||
          (registeredCourseStart > newCourseEnd && registeredCourseEnd < newCourseEnd) ||
          (registeredCourseStart == newCourseStart && registeredCourseEnd == newCourseEnd) ||
          (registeredCourseStart > newCourseStart && registeredCourseStart < newCourseEnd)
        ) {
          Materialize.toast("Could not register for this course due to a schedule conflict with " + coursesInDay[j]["name"], 4000);
          return false;
        }
        // TODO: if you have 9am-11am and 7am-9am (also, out of order lol) and add 10am-12pm, doesnt work since proptery 0 is undefined
        else if(indexToInsert === null && ((j < coursesInDay.length - 1) && ([j]["timeIndex"][0] >= newCourse["timeIndex"][1]))){
          indexToInsert = j;
        }
      }
      registeredCourses[newCourse["dayIndex"][i]-1].splice(indexToInsert, 0, newCourse);
    }
    this.setState({registeredCourses: registeredCourses});
    return true;
  },

  getInitialState: function(){
    return({registeredCourses: [[],[],[],[],[]] });
  }
});
