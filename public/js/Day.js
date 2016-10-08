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
      <div className="col" >
        <h1>{this.getDayName(this.props.dayNumber)}</h1>
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
