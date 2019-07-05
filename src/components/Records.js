import React from 'react'
import RecordsTable from './RecordsTable'
import { connect } from 'react-redux'
import { getAllRecords } from '../redux/actions/recordsAction'

class Records extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.props.getAllRecords();
    // }

    componentDidMount() {
        this.props.getAllRecords();
    }
    
    render() {
        const records = this.props.records.records;
        console.log('records page: ', records);
        return(
            <div className="records-table">
                <RecordsTable records={records}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    records: state.records
})


export default connect(mapStateToProps, {getAllRecords})(Records);