var Day = React.createClass({
  render: function() {
    var context = this;
    var courseNodes = $.map(this.props.courses, function(course) {
      return (
        <div>
          <Course addDropCourse={context.props.addDropCourse} course={course}/>
        </div>
      );
    });

    if(courseNodes.length === 0) {
      return (
        <div>
          <h4>{this.getDayName(this.props.dayNumber)}</h4>
          <p>No classes</p>
        </div>
      );
    }
    return (
      <div>
        <h4>{this.getDayName(this.props.dayNumber)}</h4>
        {courseNodes}
      </div>
    );
  },

  getInitialState: function(){
    return({course: this.props.courses });
  },

  getDayName: function(dayNumber){
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][dayNumber];
  }
});
