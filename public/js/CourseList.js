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
      console.log(coursesInDay);
      for(var j = 0; j < coursesInDay.length; j++) {
        // TODO Move this into a function
        if((coursesInDay[j]["timeIndex"][1] > course["timeIndex"][0] && coursesInDay[j]["timeIndex"][0] < course["timeIndex"][0]) ||
          (coursesInDay[j]["timeIndex"][0] > course["timeIndex"][1] && coursesInDay[j]["timeIndex"][1] < course["timeIndex"][1]) ||
          (coursesInDay[j]["timeIndex"][0] == course["timeIndex"][0] && coursesInDay[j]["timeIndex"][1] == course["timeIndex"][1])
        ) {
          // TODO more elegant error handling.
          alert("Could not add this course due to a schedule conflict with " + coursesInDay[j]["name"]);
          return;
        }
        // TODO insert course in list at correct location
        //else if(course["timeIndex"][0] >=(coursesInDay[j]["timeIndex"][1] && )
      }
      registeredCourses[course["dayIndex"][i]-1] = registeredCourses[course["dayIndex"][i]-1].concat([course]);
    }
    this.setState({registeredCourses: registeredCourses});
  },

  getInitialState: function(){
    return({registeredCourses: [[],[],[],[],[]] });
  }
});
