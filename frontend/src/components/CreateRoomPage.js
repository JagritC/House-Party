import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
	defaultVotes = 2;

	constructor(props) {
		super(props);
		//whenever the state changes the component is updated
		this.state = {
			guestCanPause: true,
			votesToSkip: this.votesToSkip,
		};
		this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
		this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
		this.handleVotesChange = this.handleVotesChange.bind(this);
	}

	handleVotesChange(e) {
		this.setState({
			votesToSkip: e.target.value,
		});
	}

	handleGuestCanPauseChange(e) {
		this.setState({
			guestCanPause: e.target.value === "true" ? true : false,
		});
	}
	//communicating with the backend
	handleRoomButtonPressed() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				//the variable names need to match with what I'm looking for in the backend in views.py
				votes_to_skip: this.state.votesToSkip,
				guest_can_pause: this.state.guestCanPause,
			}),
		};
		fetch("/api/create-room", requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	render() {
		return (
			<Grid container spacing={1}>
				<Grid item xs={12} align="center">
					<Typography component="h4" variant="h4">
						Create a Room
					</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl component="fieldset">
						<FormHelperText>
							<div align="center">Guest Control of Playback State</div>
						</FormHelperText>
						<RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
							<FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
							<FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl>
						<TextField
							required={true}
							type="number"
							onChange={this.handleVotesChange}
							defaultValue={this.defaultVotes}
							inputProps={{
								style: { textAlign: "center" },
								min: 1,
							}}
						/>
						<FormHelperText>
							<div align="center">Votes required to skip song</div>
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} align="center">
					<Button color="secondary" variant="contained" onClick={this.handleRoomButtonPressed}>
						Create a Room
					</Button>
				</Grid>
				<Grid item xs={12} align="center">
					<Button color="primary" variant="contained" to="/" component={Link}>
						Back
					</Button>
				</Grid>
			</Grid>
		);
	}
}
