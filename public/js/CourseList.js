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
        <h1>Courses</h1>
        {courseNodes}
        <Calendar registeredCourses={this.state.registeredCourses} />
      </div>
    );
  },

  addDropCourse: function(course){
    var registeredCourses = this.state.registeredCourses;
    for(var i = 0; i < course["dayIndex"].length; i++) {
      registeredCourses[course["dayIndex"][i]-1] = registeredCourses[course["dayIndex"][i]-1].concat([course]);
      console.log(registeredCourses);
    }
    this.setState({registeredCourses: registeredCourses});
  },

  getInitialState: function(){
    return({registeredCourses: [[],[],[],[],[]] });
  }
});
