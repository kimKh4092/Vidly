import React, { Component } from 'react';


class Pag extends Component {

    render() {


        let pages = [];
        for (let i = 1; i < this.props.numbOfPages; i++) {
            pages.push(i);
        }
        let class1 = 'page-item active'
        let class2 = 'page-item'


        if (pages.length === 1) {
            return null
        }


        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination m-4">
                    {pages.map(page =>
                        <li key={page} className={(page === this.props.pageNumber) ? class1 : class2}><a onClick={() => this.props.onClick(page)} className="page-link">{page}</a></li>
                    )}

                </ul>
            </nav>
        );
    }
}

export default Pag;