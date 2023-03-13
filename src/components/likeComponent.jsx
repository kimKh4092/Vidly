import React, { Component } from 'react';

class Like extends Component {
    // state = {
    //     faClass: 'fa fa-heart-o btn',
    //     clicked: false

    // }

    // changeClass = () => {
    //     if (this.props.liked === true) {

    //         return 'fa fa-heart btn'
    //     }
    //     else {
    //         return 'fa fa-heart-o btn'  

    //     }

    // }

    render() {
        let classes = 'btn fa fa-heart-o';
        if (this.props.liked === true) {
            classes = 'btn fa fa-heart'
        }
        return (
            <i onClick={this.props.getLiked}
                className={classes}
                aria-hidden='true'></i>

        );
    }
}

export default Like;