import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as chatActions from '../../store/actions/chatActions'
import Header from '../layout/Header';
import StatusBasedComponent from '../layout/StatusBasedComponent';
import UpdateLastSeen from './UpdateLastSeen';
import UserContactCard from './UserContactCard'


class UserList extends Component {
    componentDidMount() {
        this.props.listUsers();
        this.props.listUserContacts();
    }

    render() {
        let users = this.props.usersData?.users ?? [];
        let usersList = (
            <div className="col-12 col-md-6">
                <h1 className="text-primary my-1">All Users</h1>
                <StatusBasedComponent
                    status={this.props.usersData?.status}
                    loadingText={"Loading users..."}
                    statusCode={this.props.usersData?.statusCode}
                    statusText={this.props.usersData?.statusText}
                    errorMessage={this.props.usersData?.errorMessage}
                    className="text-white"
                >
                    {users.map((user) => (
                        <UserContactCard user={user} key={user.id} />
                    ))}
                </StatusBasedComponent>
            </div>
        );
        let contacts = this.props.contactsData?.users ?? [];
        let contactList = (
            <div className="col-12 col-md-6">
                <h1 className="text-primary my-1 display-6">Contacts</h1>
                <StatusBasedComponent
                    status={this.props.contactsData?.status}
                    loadingText={"Loading contacts..."}
                    statusCode={this.props.contactsData?.statusCode}
                    statusText={this.props.contactsData?.statusText}
                    errorMessage={this.props.contactsData?.errorMessage}
                    className="text-white"
                >
                    <div className="text-light">
                        {
                            contacts.map((user) => (
                                <UserContactCard user={user} key={user.id} />
                            ))
                        }
                    </div>
                </StatusBasedComponent>
            </div>
        );
        return (
            <div>
                <Header />
                <div className="container text-light pt-2">
                    <div className="row flex-md-row-reverse">
                        {contactList}
                        {usersList}
                    </div>
                </div>
                <UpdateLastSeen />
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        usersData: state.chat.users,
        contactsData: state.chat.contacts
    }
};

const userListActions = ({
    listUsers: chatActions.listUsers,
    listUserContacts: chatActions.listUserContacts
});

export default connect(mapStateToProps, userListActions)(UserList);