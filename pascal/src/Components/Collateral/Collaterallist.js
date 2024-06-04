import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'


export class Collaterallist extends Component {
    render() {
        const {thumb, title, text} = this.props
        return (
            <div>
           
                 <ul className="listing colletral-list ">
                    <li><img src={thumb}/> {title} </li>
                    <li className="listing-percentage">{text}</li>
                </ul>
             
            </div>
        )
    }
}

export default Collaterallist
