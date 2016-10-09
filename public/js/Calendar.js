var Calendar = React.createClass({
  render: function() {
    var that = this;

    var dayNodes = $.map(this.props.registeredCourses, function(courses, i) {
      var unsortedCourses = courses;
      //console.log(unsortedCourses);
      if(unsortedCourses.length > 0) {
        var sortedCourses = unsortedCourses.sort(function(a, b) {
          // We can guarantee no overlaps at this point.
          if(a["timeIndex"] !== undefined || b["timeIndex"] !== undefined) {
            console.log("I suspect we won't reach this.");
            return b["timeIndex"][1] - a["timeIndex"][1];
          }
          return 0;
        });
        console.log(sortedCourses);
      }
      else {
        sortedCourses = courses;
      }
      return (
        <div className="col s12 m12 l12">
          <Day dayNumber={i} courses={sortedCourses}/>
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

  // addDropCourse: function(course){
  //   var registeredCourses = this.state.registeredCourses;
  //   for(var i = 0; i < course["dayIndex"].length; i++) {
  //     registeredCourses[course["dayIndex"][i]-1] = registeredCourses[course["dayIndex"][i]-1].concat([course]);
  //     console.log(registeredCourses);
  //   }
  //   this.setState({registeredCourses: registeredCourses});
  // },
  //
  // getInitialState: function(){
  //   return({registeredCourses: [[],[],[],[],[]] });
  // }
});
