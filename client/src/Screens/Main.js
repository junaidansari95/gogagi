import React from "react";
import '../App.css';
import { Box, OutlinedInput, InputAdornment, Typography, Card, CardContent, TextField, Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, addUser } from "../Actions/userAction";

class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchString: '',
            locFilter: '',
            name:'',
            location: '',
        };
    }
    // static getDerivedStateFromProps(state,props){
    //     if (state.all_users !== props.all_users) {

    //     } else {

    //     }
    // }
    componentDidMount() {
        this.props.getUsers();
    }
    handleChange = event => {
        this.setState({ searchString: event.target.value.trim().toLowerCase() });
    }
    handleLoc = event => {
        this.setState({ locFilter: event.target.value })
    }
    handleNameChange = event => {
        this.setState({ name: event.target.value });
    }
    handleLocationChange = event => {
        this.setState({ location: event.target.value });
    }
    handlePersonSubmit = event => {
        event.preventDefault();
        this.props.addUser({
            name: this.state.name,
            address: this.state.location
        });
        this.setState({
            name: null,
            location: null
        })
    }
    render() {
        var { locFilter, searchString } = this.state;
        const { all_users } = this.props;
        let text = all_users;
        if (undefined !== all_users && all_users.length) {
            if (searchString) {
                text = text.filter(info => info.name.toLowerCase().match(searchString));
            }
        }
        return (
            <Box>
                <form className="add-person" noValidate autoComplete="off" onSubmit={this.handlePersonSubmit}>
                    <TextField label="Name" className="input-text" onChange={this.handleNameChange}/>
                    <TextField label="Location" className="input-text" onChange={this.handleLocationChange}/>
                    <Button color="primary" type="submit">Add person</Button>
                </form>
                <Box style={{ margin: 'auto', width: 500, display: 'flex', justifyContent: 'space-between', marginTop: 180, marginBottom: 100 }}>
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="h4" gutterBottom align='center'>Who</Typography>
                        <Typography variant="caption" display="block" color='textSecondary'>Person's name</Typography>
                        <OutlinedInput
                            placeholder='Product name' onChange={this.handleChange}
                            endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>} />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="h4" gutterBottom align='center'>Where</Typography>
                        <Typography variant="caption" display="block" color='textSecondary'>Person's location</Typography>
                        <OutlinedInput
                            placeholder='Location' onChange={this.handleLoc}
                            endAdornment={<InputAdornment position="end"><LocationOnIcon /></InputAdornment>} />
                    </Box>
                </Box>
                <Box className="grid-container">
                    <Box className="grid-row">
                        <Box className="grid-row">
                            {
                                (undefined !== all_users && all_users.length) ? text.filter(index => locFilter ? index.address.toLowerCase().includes(locFilter) : true).map(index => {
                                    return <Card className="card-root" variant="outlined" key={index._id}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {index.name}
                                            </Typography>
                                            <Typography className="adrs-pos" color="textSecondary">
                                                {index.address}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }) : null
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}
const mapStateToProps = state => {
    const { user } = state;
    const { all_users } = user;
    return ({ all_users })
};
export default connect(mapStateToProps, { getUsers, addUser })(withRouter(Main));