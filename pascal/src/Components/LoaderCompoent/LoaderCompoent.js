import React, { Component } from "react";
// import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "./Loader.scss"
class LoaderComponent extends Component {
	render() {
		if (this.props.loading) {
			return (
				<div className="overlayloader">
					<Loader type="Bars" color="#fff" height={60} width={60} />
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LoaderComponent);
