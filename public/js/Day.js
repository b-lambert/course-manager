var Day = React.createClass({
  render: function() {
    var that = this;

    var courseNodes = $.map(this.props.courses, function(course) {
      return (
        <div>
          <Course course={course}/>
        </div>
      );
    });

    return (
      <div className="col" >
        <h1>Day</h1>
        {courseNodes}
      </div>
    );
  },

  getInitialState: function(){
    return({course: this.props.courses });
  }
});
