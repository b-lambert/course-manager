var Calendar = React.createClass({
  render: function() {
    var that = this;
    var dayNodes = $.map(this.props.registeredCourses, function(courses, i) {
      return (
        <Day dayNumber={i} courses={courses}/>
      );
    });

    return (
      <div>
        <input onChange={this.handleNameChange} value={this.state.calendarName} type="text"></input>
        <h3>Week</h3>
        {dayNodes}
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
