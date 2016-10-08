var Course = React.createClass({
  render: function(){
    return (
      <div className="card" onClick={this.addDropCourse}>
        <div className="card-content">
          <div className="card-title">
            {this.props.course["name"]}
          </div>
          <p>
            {this.props.course["author"]}
          </p>
          <p>
            {this.props.course["days"].join(", ")}
          </p>
          <p>
            {this.props.course["time"].join("-")}
          </p>
        </div>
      </div>
    );
  },

  addDropCourse: function(){
    this.props.addDropCourse(this.props.course);
  }
});
