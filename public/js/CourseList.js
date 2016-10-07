var CourseList = React.createClass({
  render: function() {
    var courseNodes = $.map(this.props.data, function(post) {
      return (
        <Course/>
      );
    });

    return (
      <div className="courseList">
        {courseNodes}
      </div>
    );
  }
});
