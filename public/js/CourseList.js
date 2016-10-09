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
      <h2>Courses</h2>

        <div className="courseList col s6 m4 l2">
          {courseNodes}
        </div>
      <div className="col s6 m4 l10">
        <Calendar registeredCourses={this.state.registeredCourses} />
      </div>
      </div>
    );
  },

  addDropCourse: function(course){
    var registeredCourses = this.state.registeredCourses;
    for(var i = 0; i < course["dayIndex"].length; i++) {
      var coursesInDay = registeredCourses[course["dayIndex"][i]-1];
      //console.log(coursesInDay);
      for(var j = 0; j < coursesInDay.length; j++) {
        var indexToInsert = null;
        // TODO Move this into a function
        if((coursesInDay[j]["timeIndex"][1] > course["timeIndex"][0] && coursesInDay[j]["timeIndex"][0] < course["timeIndex"][0]) ||
          (coursesInDay[j]["timeIndex"][0] > course["timeIndex"][1] && coursesInDay[j]["timeIndex"][1] < course["timeIndex"][1]) ||
          (coursesInDay[j]["timeIndex"][0] == course["timeIndex"][0] && coursesInDay[j]["timeIndex"][1] == course["timeIndex"][1]) ||
          (coursesInDay[j]["timeIndex"][0] > course["timeIndex"][0] && coursesInDay[j]["timeIndex"][0] < course["timeIndex"][1])
        ) {
          // TODO more elegant error handling.
          alert("Could not add this course due to a schedule conflict with " + coursesInDay[j]["name"]);
          return;
        }
        // TODO: if you have 9am-11am and 7am-9am (also, out of order lol) and add 10am-12pm, doesnt work since proptery 0 is undefined
        else if(indexToInsert === null && ((j < coursesInDay.length - 1) && ([j]["timeIndex"][0] >= course["timeIndex"][1]))){
          indexToInsert = j;
        }
      }
      registeredCourses[course["dayIndex"][i]-1].splice(indexToInsert, 0, course);
    }
    this.setState({registeredCourses: registeredCourses});
  },

  getInitialState: function(){
    return({registeredCourses: [[],[],[],[],[]] });
  }
});
