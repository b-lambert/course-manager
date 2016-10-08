var CourseList = React.createClass({
  render: function() {
    var that = this;
    var courseNodes = $.map(this.props.data["courses"], function(course) {
      return (
        <div>
          <Course addDropCourse={that.addDropCourse} registeredCourses={that.state.registeredCourses} course={course}/>
        </div>
      );
    });

    return (
      <div className="courseList">
        <h2>Courses</h2>
        {courseNodes}
        <Calendar registeredCourses={this.state.registeredCourses} />
      </div>
    );
  },

  addDropCourse: function(course){
    var registeredCourses = this.state.registeredCourses;
    for(var i = 0; i < course["dayIndex"].length; i++) {
      var coursesInDay = registeredCourses[course["dayIndex"][i]-1];
      for(var j = 0; j < coursesInDay.length; j++) {
        if((coursesInDay[j]["timeIndex"][0] < course["timeIndex"][1])|| (coursesInDay[j]["timeIndex"][1] > course["timeIndex"][0])) {
          console.log("Could not add this course due to a conflict.");
          return;
        }
      }
      registeredCourses[course["dayIndex"][i]-1] = registeredCourses[course["dayIndex"][i]-1].concat([course]);
    }
    this.setState({registeredCourses: registeredCourses});
  },

  getInitialState: function(){
    return({registeredCourses: [[],[],[],[],[]] });
  }
});
