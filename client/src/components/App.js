import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase";

import * as actions from "../actions";

const config = {
	apiKey: "AIzaSyDa0b-syquw1IEPaCQ58wBHKYlpUhG3eAg",
	authDomain: "pollster-1f5ec.firebaseapp.com",
	databaseURL: "https://pollster-1f5ec.firebaseio.com",
	projectId: "pollster-1f5ec",
	storageBucket: "pollster-1f5ec.appspot.com",
	messagingSenderId: "894881247278",
};

const fire = firebase.initializeApp(config);
const firedb = fire.database();
const fireauth = fire.auth();

import Dashboard from "./dashboard/dashboard.js";
import Poll from "./poll";
import CreateEdit from "./createEdit";
import Header from "./header";
import Landing from "./landing/landing";

class App extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.initialize_firebase(firedb, fireauth));
	}

	render() {
		return (
			<Router>
				<div className="app">
					<div className="header-container container">
						<Header />
					</div>
					<main>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/poll/:authorId/:pollId" component={Poll} />
						<Route exact path="/create" component={CreateEdit} />
						<Route exact path="/landing" component={Landing} />
					</main>
				</div>
			</Router>
		);
	}
}

export default connect()(App);
