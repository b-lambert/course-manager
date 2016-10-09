var Day = React.createClass({
  render: function() {
    var courseNodes = $.map(this.props.courses, function(course) {
      return (
        <div>
          <Course course={course}/>
        </div>
      );
    });

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
