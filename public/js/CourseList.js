var CourseList = React.createClass({
  render: function() {
    var that = this;
    var courseNodes = $.map(this.props.data["courses"], function(course) {
      return (
        <Course context={that} course={course}/>
      );
    });

    return (
      <div className="courseList">
        <h1>Courses</h1>
        {courseNodes}
      </div>
    );
  },


  getInitialState: function(){
    return({registeredCourses: []});
  }
});
