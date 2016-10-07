var Course = React.createClass({
  render: function(){
    return (
      <p>
        {this.props.course["name"]}
      </p>
    );
  }
});
