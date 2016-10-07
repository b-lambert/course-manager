var CourseList = React.createClass({
  render: function() {
    var courseNodes = $.map(this.props.data["courses"], function(course) {
      return (
        <Course course={course}/>
      );
    });

    return (
      <div className="courseList">
        <h1>Courses</h1>
        {courseNodes}
      </div>
    );
  }
});
