import React from 'react';
import { connect } from 'react-redux'
import { getWeeklyTotal } from '../../redux/actions/homeAction'
import ReactEcharts from 'echarts-for-react'

class WeekyChart extends React.Component {
    constructor(props) {
        super(props);
        this.props.getWeeklyTotal(this.props.year);
        this.state = {
            year: ""
        }
    } 

    componentDidUpdate(prevProps){
        if(this.props.year !== prevProps.year) {
            this.setState({
                year: this.props.year
            })
            this.props.getWeeklyTotal(this.props.year);
        }
    }

    getSales = () => (
        this.props.weeklyTotal.map(total => {
            if(total != null) return total.totalSale
            else return 0
        })
    )
    getWeeks = () => (
        this.props.weeklyTotal.map((total, index) => {
            return index
        })
    )

    getOptionOfWeeklyTotal = () => {
        const option = {
            title: {text: `Weekly Sales - ${this.props.year}`},
            tooltip: {},
            xAxis: {
                data: this.getWeeks()
            },
            yAxis:{},
            series: [{
                name: 'sales',
                type: 'bar',
                data: this.getSales()
            }]
        }
        return option
    }
    render() {
        return(
            <div className="weekly-charts">
            <ReactEcharts option={this.getOptionOfWeeklyTotal()} lazyUpdate={true}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    weeklyTotal: state.total.weeklyTotal
})

export default connect(mapStateToProps, {getWeeklyTotal})(WeekyChart);