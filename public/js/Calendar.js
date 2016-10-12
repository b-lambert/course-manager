var Calendar = React.createClass({
  render: function() {
    var context = this;
    var dayNodes = $.map(this.props.registeredCourses, function(courses, i) {
      var courseArray = [];
      for (var key in courses) {
        if (courses.hasOwnProperty(key)) {
          courseArray.push(courses[key]);
        }
      }
      courseArray.sort(function(c1, c2) {
        // We can guarantee no overlaps at this point.
        if(c1["timeIndex"] !== undefined || c2["timeIndex"] !== undefined) {
          return c1["timeIndex"][1] - c2["timeIndex"][1];
        }
      });
      return (
        <div className="col s12 m12 l12">
          <Day
            addDropCourse={context.props.addDropCourse}
            dayNumber={i}
            courses={courseArray}/>
        </div>
      );
    });

    return (
      <div>
      <h3>Weekly Schedule</h3>
        <div class="input-field">
          <label htmlFor="calendarName">Calendar Name:</label>
          <input
            onChange={this.handleNameChange}
            placeholder={this.state.calendarName}
            id="calendarName"
            type="text">
          </input>
        </div>
        <div className="row">
          {dayNodes}
        </div>
      </div>
    );
  },
  getInitialState: function(){
    return({registeredCourses: this.props.registeredCourses, calendarName: "My Calendar"});
  },

  handleNameChange: function(e){
    this.setState({calendarName: e.target.value});
  }
});
