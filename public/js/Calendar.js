var Calendar = React.createClass({
  render: function() {
    var that = this;

    var dayNodes = $.map(this.props.registeredCourses, function(courses, i) {
      var unsortedCourses = courses;
      var sortedCourses = []
      for (var key in unsortedCourses) {
        if (unsortedCourses.hasOwnProperty(key)) {
          sortedCourses.push(unsortedCourses[key]);
        }
      }
      sortedCourses.sort(function(a, b) {
        // We can guarantee no overlaps at this point.
        if(a["timeIndex"] !== undefined || b["timeIndex"] !== undefined) {
          return a["timeIndex"][1] - b["timeIndex"][1];
        }
        return 0;
      });
      return (
        <div className="col s12 m12 l12">
          <Day dayNumber={i} key={i} courses={sortedCourses}/>
        </div>
      );
    });
    // TODO give input some kind of maxwidth
    return (
      <div>
      <h3>Weekly Schedule</h3>
        <div class="input-field">
          <label htmlFor="calendarName">Calendar Name:</label>
          <input onChange={this.handleNameChange} placeholder={this.state.calendarName} id="calendarName" type="text"></input>
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
